import {
  Button, Drawer, Input, message, Space, Tree,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_SUCCESS_CODE } from '../../../../common/constants';
import { PageWrapper } from '../../../../components/PageWrapper';
import UserService from '../../../../services/UserService/User.service';

const Branch = styled.div`
  margin: 30px;
`;

const MenuTree = styled.div`
  padding: 50px;
  
  .button {
    margin-bottom: 30px;
  }
`;

const AddComponent = () => {
  const [expandedKeys, setExpandedKeys] = useState(['mainTree']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [childTreeDate, setChildTreeDate] = useState([]);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [path, setPath] = useState('');
  const [icon, setIcon] = useState('');

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue);
  };

  const addMenu = () => {
    if (selectedKeys.length === 0) {
      message.warn('请选中一个分支');
    } else {
      setVisible(true);
    }
  };

  const addAction = () => {
    const menu = {
      title, key, path, icon, selectedKeys: selectedKeys[0],
    };
    UserService.addMenu(menu).then((response) => {
      if (response.code === API_SUCCESS_CODE) {
        setLoad(true);
        UserService.menuList().then((res) => {
          if (res.code === API_SUCCESS_CODE) {
            setLoad(false);
            setChildTreeDate(res.data.data);
          } else {
            message.warn('get data error！');
          }
        }).finally(() => {
        });
      } else {
        message.warn('get data error！');
      }
    }).finally(() => {
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    UserService.menuList().then((response) => {
      if (response.code === API_SUCCESS_CODE) {
        setLoad(false);
        setChildTreeDate(response.data.data);
      } else {
        message.warn('get data error！');
      }
    }).finally(() => {
    });
  }, [load]);

  const treeData = [
    {
      title: '主干',
      key: 'mainTree',
      children: childTreeDate,
    },
  ];

  return (
    <PageWrapper>

      <Drawer
        title="添加分支"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        key="right"
        extra={(
          <Space>
            <Button type="primary" onClick={addAction}>
              添 加
            </Button>
          </Space>
        )}
      >
        <Branch>
          <p>title</p>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </Branch>
        <Branch>
          <p>key</p>
          <Input onChange={(e) => setKey(e.target.value)} />
        </Branch>
        <Branch>
          <p>path</p>
          <Input onChange={(e) => setPath(e.target.value)} />
        </Branch>
        <Branch>
          <p>icon</p>
          <Input onChange={(e) => setIcon(e.target.value)} />
        </Branch>
      </Drawer>
      <MenuTree>
        <Button className="button" onClick={addMenu}>添加</Button>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </MenuTree>
    </PageWrapper>
  );
};

export default AddComponent;
