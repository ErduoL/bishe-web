import Api from './api';
import { RequestClientClass } from '../../utils/requestClient';
import Config from '../../config';

const requestClient = () => new RequestClientClass(Config.SERVER_HOST);

const login = async (payload) => {
  const uri = Api.login();
  const res = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    // .setQueryParameter(payload)
    .doPostUseContentTypeJson();
  return res;
};

const menuList = async () => {
  const uri = Api.menuList();
  const res = await requestClient()
    .setUri(uri)
    // .setPayload(payload)
    // .setQueryParameter(payload)
    // .doPostUseContentTypeJson();
    .doGet();
  return res;
};

const addMenu = async (payload) => {
  const uri = Api.addMenu();
  const res = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    // .setQueryParameter(payload)
    .doPostUseContentTypeJson();
  return res;
};

const doPostGetUserList = async (page, pageSize, payload) => {
  const uri = `${Api.userList()}/${page}/${pageSize}`;
  const res = await requestClient()
    .setUri(uri)
    .setPayload(payload)
    .doPostUseContentTypeJson();
  return res;
};

const doPostDeleteMember = async (limits, id) => {
  const uri = `${Api.delete()}/${limits}/${id}`;
  const res = await requestClient()
    .setUri(uri)
    .doDelete();
  return res;
};

export default {
  login,
  menuList,
  addMenu,
  doPostDeleteMember,
  doPostGetUserList,
};
