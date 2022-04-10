import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button, Input, message, Popconfirm, Select, Space, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { PageWrapper } from '../../components/PageWrapper';
import { paginationConfig, API_SUCCESS_CODE } from '../../common/constants';
import UserService from '../../services/UserService';

const MemberComponent = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState(false);
  const [name, setName] = useState('');
  const { Option } = Select;

  let wrapper = { status, name };
  const filter = () => {
    setFilterStatus(!filterStatus);
    wrapper = { status, name };
  };

  useEffect(() => {
    setLoading(true);
    UserService.doPostGetUserList(page, pageSize, wrapper).then((response) => {
      if (response.code === API_SUCCESS_CODE) {
        console.log(response);
        setData(response.data.list);
        setTotal(response.data.total);
        setLoading(false);
      } else {
        message.warn('get data error！');
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [page, pageSize, filterStatus]);

  const deleteHandle = (value) => {
    console.log(value);
  };

  const columns = [
    {
      title: '登录名',
      dataIndex: 'memberName',
      width: 50,
      ellipsis: 'true',
      // fixed: true,
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
      width: 40,
      ellipsis: 'true',

    },

    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 50,
      ellipsis: 'true',

    },
    {
      title: '权限',
      dataIndex: 'limits',
      width: 60,
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      width: 40,
    },
    {
      title: '修改日期',
      dataIndex: 'updateTime',
      width: 60,
      ellipsis: 'true',

    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      width: 60,
      ellipsis: 'true',

    },
    {
      title: '操作',
      dataIndex: 'actiom',
      width: 50,
      fixed: 'right',
      render: (text, r) => (
        <Space>
          <Button
            style={{ padding: 0 }}
            type="link"
            // onClick={() => showDrawer(r)}
          >
            修改
          </Button>

          <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => deleteHandle(r)}>
            <Button
              style={{ padding: 0 }}
              danger
              type="link"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageWrapper>
      <PageTitle title="详情查看" />
      <div className="filters">
        <div style={{ display: 'flex' }} />
        <Space>
          <Input placeholder="按照名字模糊查询" onChange={(e) => { setName(e.target.value); }} />
          <Select defaultValue="" style={{ width: '150px' }} onChange={setStatus}>
            <Option value="">状态不限</Option>
            <Option value="0">正常</Option>
            <Option value="1">异常</Option>
          </Select>

          <Button style={{ width: '150px' }} type="primary" loading={loading} onClick={filter}>
            查询
          </Button>
        </Space>
      </div>
      <div className="data-table">
        <Table
          rowKey="id"
          dataSource={data}
          columns={columns}
          loading={loading}
          scroll={{ y: window.innerHeight - 379 }}
          pagination={{
            ...paginationConfig,
            current: page,
            pageSize,
            total,
            onShowSizeChange: (p, s) => {
              setPageSize(s);
            },
            onChange: (p, s) => {
              setPage(p);
              setPageSize(s);
            },
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default MemberComponent;
