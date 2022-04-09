import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import ContentComponent, { Content } from '../../components/Content';
import HeaderComponent from '../../components/Header';
import FooterComponent from '../../components/FooterComponent';
import { AppContainer } from './components/AppContainer';
import { sideBarMenus } from '../../common/constants';

function AppComponent() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = sideBarMenus;

  return (
    <BrowserRouter>
      <AppContainer>
        <SideBar
          menus={menus}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content>
          <HeaderComponent />
          <ContentComponent
            collapsed={collapsed}
          />
          <FooterComponent />
        </Content>
      </AppContainer>
    </BrowserRouter>

  );
}

export default AppComponent;
