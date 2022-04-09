import { Breadcrumb } from 'antd';
import React from 'react';

const { Item } = Breadcrumb;
const BreadcrumbComponent = () => (
  <Breadcrumb style={{ margin: '16px 0' }}>
    <Item>User</Item>
    <Item>Bill</Item>
  </Breadcrumb>
);

export default BreadcrumbComponent;
