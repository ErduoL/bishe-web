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

export default {
  login,
};
