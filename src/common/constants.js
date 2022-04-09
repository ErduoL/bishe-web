import { RetweetOutlined } from '@ant-design/icons';
import React from 'react';
import paths from '../routers/paths';
import logo from '../images/logo.png';

// 传给api的token
export const API_TOKEN_KEY = 'token';

// 用户token
export const LOCAL_USER_INFO_TOKEN = '@QVQ@-USER-TOKEN';

// 状态码
export const API_SUCCESS_CODE = 200;

// 侧边栏宽度
export const SIDE_BAR_WIDTH = '200px';

// 侧边栏关闭时宽度
export const COLLAPSED_SIDEBAR_WIDTH = '60px';

// 侧边栏logo
export const LOGO = <img src={logo} alt="logos" style={{ width: '200px' }} />;

// sidebar和header黑名单
export const sideBarBlacklist = [
  paths.login,
  paths.register,
];
export const headerBlacklist = [
  paths.login,
  paths.register,
];

// 全局分页配置
export const paginationConfig = {
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50],
  pageSize: 10,
  size: 'default',
  showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共${total} 条`,
};

// 侧边栏条目
export const sideBarMenus = [
  {
    key: 'home',
    title: '首页',
    path: paths.home,
    icon: <RetweetOutlined />,
  },
];

// Footer 内容
export const FOOTER_TEXT = 'Copyright © SDMU - Wang  Wenlong ';
