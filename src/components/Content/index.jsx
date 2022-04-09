import { Layout } from 'antd';
import styled from 'styled-components';
import React from 'react';
import Proptypes from 'prop-types';
import App from '../../pages/App/components/App';

export const Content = styled(Layout)`
  height: 100vh;
`;

function ContentComponent(props) {
  const { collapsed } = props;

  return (
    <Content>
      {/* <BreadcrumbComponent /> */}
      <App
        collapsed={collapsed}
      />
    </Content>
  );
}

ContentComponent.propTypes = {
  collapsed: Proptypes.bool,
};

export default ContentComponent;
