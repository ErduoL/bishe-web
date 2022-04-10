import { Layout, Menu } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath, Link } from 'react-router-dom';
import {
  COLLAPSED_SIDEBAR_WIDTH, LOGO, sideBarBlacklist, SIDE_BAR_WIDTH,
} from '../../common/constants';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SideBar = (props) => {
  const {
    menus,
    collapsed,
    setCollapsed,
    location,
    history,
  } = props;

  const inSideBarBlacklist = sideBarBlacklist.some((item) => !!matchPath(location.pathname, item));

  const onCollapse = (e) => {
    setCollapsed(e);
  };

  return (
    <>
      {
        !inSideBarBlacklist && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={SIDE_BAR_WIDTH}
            collapsedWidth={COLLAPSED_SIDEBAR_WIDTH}
          >
            <div className="logo" style={{ height: '60px' }}>
              {LOGO}
            </div>

            <Menu
              theme="dark"
              defaultSelectedKeys="home"
              mode="inline"
            >
              {
                menus.map((menu) => {
                  const {
                    path = '', title, menus: subMenus = [], key, icon,
                  } = menu;

                  if (subMenus.length) {
                    return (
                      <SubMenu
                        key={key}
                        icon={
                          <img src={icon} alt="logo" style={{ width: '20px' }} />
                        }
                        title={title}
                        onTitleClick={() => {
                          if (path) {
                            history.push(path);
                          }
                        }}
                      >
                        {
                          subMenus.map((submenu) => (
                            <Item
                              key={submenu.key}
                              icon={
                                <img src={submenu.icon} alt="logo" style={{ width: '20px' }} />
                              }
                            >
                              <Link to={submenu.path}>{submenu.title}</Link>
                            </Item>
                          ))
                       }
                      </SubMenu>
                    );
                  }

                  return (
                    <Item
                      key={key}
                      icon={
                        <img src={icon} alt="logo" style={{ width: '20px' }} />
                      }
                    >
                      <Link to={path}>{title}</Link>
                    </Item>
                  );
                })
              }
            </Menu>
          </Sider>
        )
      }
    </>
  );
};

SideBar.propTypes = {
  menus: PropTypes.array.isRequired,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default React.memo(
  withRouter(
    SideBar,
  ),
);
