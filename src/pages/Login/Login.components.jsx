import React from 'react';
import styled from 'styled-components';
import {
  Button, Form, Input, message,
} from 'antd';
import jsCookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
import mySchool from '../../images/mySchool.jpeg';
import hongzhong from '../../images/hongzhong.jpg';
import { API_SUCCESS_CODE, LOCAL_USER_INFO_TOKEN } from '../../common/constants';
import UserService from '../../services/UserService';
import paths from '../../routers/paths';

const LoginStyle = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url(${mySchool});
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
      height: 550px;
      width: 900px;
      border-radius: 15px;
      background-color: rgba(0,0,0,0.2);
      display: flex;
      
      .container{
        width: inherit;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;

        .content {
          width: 40%;
          height: 100%;
          border-radius: 0 15px 15px 0;

          .login{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 150px;

            .login-button{
              width: 220px;
              position: absolute;
              left: -73px;
            }

            .register-button {
              width: 220px;
              position: relative;
            }
          }
        }
        .image{
          width: 60%;
          height: 100%;
          border-radius: 15px 0 0 15px;

          img{
            width: 100%;
            height: 100%;
            opacity: 0.8;
            border-radius: 15px 0 0 15px;
          }
        }
      }  
    }
`;

const GuardComponent = () => (
  <Redirect exact to={paths.home} />
);

const LoginComponents = () => {
  const onFinishFailed = () => {

  };

  const onFinish = (values) => {
    const user = { loginName: values.username, password: values.password };
    UserService.login(user).then((response) => {
      if (response.code === API_SUCCESS_CODE) {
        jsCookie.set(LOCAL_USER_INFO_TOKEN, response.data.token);
        jsCookie.set('username', response.data.data.memberName);
        jsCookie.set('avatar', response.data.data.avatar);
        jsCookie.set('id', response.data.data.id);
        jsCookie.set('auth', response.data.data.auth);
        const { menus } = response.data.data;

        jsCookie.set('menus', JSON.stringify(menus));

        message.success(response.message);
        setTimeout(() => {
          window.location.replace('/');
        }, 500);
      } else {
        message.warn(response.message);
      }
    }).finally(() => {

    });
  };

  const register = () => {
    window.location.replace('/register');
  };

  const token = jsCookie.get(LOCAL_USER_INFO_TOKEN);
  if (token) {
    return <GuardComponent />;
  }

  return (
    <LoginStyle>
      <div className="login-box">
        <div className="container">
          <div className="image">
            <img src={hongzhong} alt="洪钟" />
          </div>
          <div className="content">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="login"
            >
              <h2 style={{ color: '#fff' }}>用户登录</h2>
              <Form.Item
                name="username"
                className="login_box"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input id="text" type="text" style={{ width: '320px' }} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                className="login_box"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password type="password" style={{ width: '320px' }} placeholder="密 码" />
              </Form.Item>

              <div>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                  className="button-list"
                >
                  <Button type="primary" htmlType="submit" className="login-button">
                    login
                  </Button>
                </Form.Item>

                <Button className="register-button" type="primary" onClick={register}>
                  register
                </Button>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

export default LoginComponents;
