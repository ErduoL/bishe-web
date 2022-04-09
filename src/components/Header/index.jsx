import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { headerBlacklist } from '../../common/constants';

const HeaderComponent = (props) => {
  const { location } = props;

  const inHeaderBlacklist = headerBlacklist.some((item) => !!matchPath(location.pathname, item));
  return (
    <>
      {!inHeaderBlacklist && (
      <Header style={{ padding: 0 }} />
      )}
    </>
  );
};

HeaderComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(HeaderComponent);
