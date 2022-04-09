import React from 'react';
import {
  withRouter, matchPath, Switch, Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { message } from 'antd';
import jsCookie from 'js-cookie';
import {
  COLLAPSED_SIDEBAR_WIDTH, headerBlacklist, LOCAL_USER_INFO_TOKEN, sideBarBlacklist, SIDE_BAR_WIDTH,
} from '../../../common/constants';

import Routers from '../../../routers';
import paths from '../../../routers/paths';

const getWidth = (collapsed, inSideBarBlacklist) => {
  if (inSideBarBlacklist) {
    return '100vw';
  }
  if (collapsed) {
    return `calc(100vw - ${COLLAPSED_SIDEBAR_WIDTH}px)`;
  }

  return `calc(100vw - ${SIDE_BAR_WIDTH}px)`;
};

const getHeigth = (inHeaderBlacklist) => {
  if (inHeaderBlacklist) {
    return '100vh';
  }

  return 'calc(100vh - 64px)';
};

const AppPageWrapper = styled.div`
  height: ${(props) => getHeigth(props.inHeaderBlacklist)};
  box-sizing: border-box;
  position: relative;
  padding: ${(props) => (props.inSideBarBlacklist ? 0 : '15px 12px 0')} ;
  width: ${(props) => getWidth(props.collapsed, props.inSideBarBlacklist)};
`;

const GuardComponent = ({ from }) => {
  message.error('请登录！');
  return (
    <Redirect exact from={from} to={paths.login} />
  );
};

const App = (props) => {
  const { location, collapsed } = props;

  const inHeaderBlacklist = headerBlacklist.some((item) => !!matchPath(location.pathname, item));
  const inSideBarBlacklist = sideBarBlacklist.some((item) => !!matchPath(location.pathname, item));

  const token = jsCookie.get(LOCAL_USER_INFO_TOKEN);

  return (
    <AppPageWrapper
      inSideBarBlacklist={inSideBarBlacklist}
      inHeaderBlacklist={inHeaderBlacklist}
      collapsed={collapsed}
    >
      <Switch>
        {Routers.map((route) => {
          if (route?.guard && (!token)) {
            return <GuardComponent key={route.path} from={route.path} />;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact
            />
          );
        })}
      </Switch>
    </AppPageWrapper>
  );
};

App.propTypes = {
  collapsed: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

GuardComponent.propTypes = {
  from: PropTypes.string,
};

export default withRouter(App);
