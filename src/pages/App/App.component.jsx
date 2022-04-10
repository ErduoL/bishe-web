import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jsCookie from 'js-cookie';
import SideBar from '../../components/SideBar';
import ContentComponent, { Content } from '../../components/Content';
import HeaderComponent from '../../components/Header';
import FooterComponent from '../../components/FooterComponent';
import { AppContainer } from './components/AppContainer';

const AppComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  let menus = [];

  // console.log(menus);
  try {
    menus = JSON.parse(jsCookie.get('menus'));
  } catch (error) {
    console.log(error);
  }

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
};

export default AppComponent;
