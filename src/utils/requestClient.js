/* eslint-disable */
import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { LOCAL_USER_INFO_TOKEN, API_TOKEN_KEY } from '../common/constants';



export const defaultHeaders = {
  'Content-Type': 'application/json',
};

const defaultOptions = {
  method: 'GET',
  headers: defaultHeaders,
};

/**
 * Construct URL based on provided URL and possible GET parameter.
 * @param baseUrl
 * @param params
 * @returns {string}
 */
export const constructUrlGetParameters = (baseUrl, params) => {
  const result = Object.keys(params).map(key => {
    if (params[key]) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    }
  });

  const queryString = result.length ? `?${result.join('&')}` : '';
  return `${baseUrl}${queryString}`;
};

export class RequestClientClass {
  constructor(baseUrl, fetch = axios) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
    this.headers = defaultOptions.headers;
    this.payload = '';
    this.uri = '';
    this.queryUrl = {};
    this.requireHeadersReturn = false;
  }

  /**
   * Trim up extra space, and leading slash
   * @param string
   */
  static clean (string) {
    if (typeof string === 'string') {
      return string.trim().replace(/\/$/, '');
    }
    return string;
  }

  setUri (uri) {
    this.uri = uri;

    return this;
  }
  setHeaders (headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  setPayload (payload) {
    this.payload = payload;
    return this;
  }

  /**
   * Set Get Parameter
   * @param {Object} queryUrl
   * @returns {HttpClient}
   */
  setQueryParameter (queryUrl) {
    if (typeof queryUrl === 'object') {
      Object.keys(queryUrl).forEach((key) => {
        this.setQueryParameterUrl(key, queryUrl[key]);
      });
    }
    return this;
  }

  setQueryParameterUrl (key, value) {
    this.queryUrl[key] = value;
    return this;
  }

  constructFQDN () {
    const uri = [this.baseUrl, this.uri].map(RequestClientClass.clean).filter(Boolean).join('/');

    return constructUrlGetParameters(uri, this.queryUrl);
  }

  setRequireHeadersReturn (value) {
    this.requireHeadersReturn = value;
    return this;
  }

  async doMethod (method = 'GET') {
    const options = {
      baseURL: this.baseUrl,
      url: this.uri,
      ...defaultOptions,
      headers: {
        ...this.headers,
      },
      method,
    };


    if (Cookies.get(LOCAL_USER_INFO_TOKEN)) {
      options.headers[API_TOKEN_KEY] = Cookies.get(LOCAL_USER_INFO_TOKEN);
    }


    if (method === 'GET') {
      options.params = this.queryUrl;
    }

    if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
      options.data = qs.stringify(this.payload);
    }

    const response = await this.fetch(options);
    if (response.status >= 400) {
      throw new Error(`Response error: ${this.uri}`);
    }

    const finalResponse = response.data;
    if (this.requireHeadersReturn) {
      const finalHeaders = {
        ...response.headers,
        ...finalResponse.headers,
      };
      finalResponse.headers = finalHeaders;
    }
    // if (finalResponse?.code === USER_UNLOGIN_STATUS) {
    // } else if (finalResponse?.code === USER_UNAUTH_STATUS) {
    // } else if (finalResponse?.code === USER_NOT_FOUND_PERMISSION) {
    //   message.warn(finalResponse?.msg);
    // }

    return finalResponse;
  }

  async doMethodUseHeaders (method = 'GET', headers = {}) {

    const options = {
      baseURL: this.baseUrl,
      url: this.uri,
      ...defaultOptions,
      headers: {
        ...this.headers,
        ...headers,
      },
      method,
    };


    if (Cookies.get(LOCAL_USER_INFO_TOKEN)) {
      options.headers[API_TOKEN_KEY] = Cookies.get(LOCAL_USER_INFO_TOKEN);
    }


    if (method === 'GET') {
      options.params = this.queryUrl;
    }

    if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
      options.data = this.payload;
    }

    const response = await this.fetch(options);
    if (response.status >= 400) {
      throw new Error(`Response error: ${this.uri}`);
    }

    const finalResponse = response.data;
    if (this.requireHeadersReturn) {
      const finalHeaders = {
        ...response.headers,
        ...finalResponse.headers,
      };
      finalResponse.headers = finalHeaders;
    }
    // if (finalResponse?.code === USER_UNLOGIN_STATUS) {
    //   window.location.href = '/login';
    // }

    return finalResponse;
  }

  doPost () {
    return this.doMethod('POST');
  }

  doPut () {
    return this.doMethod('PUT');
  }

  doGet (useCustomHeaders = false) {
    return this.doMethod('GET', useCustomHeaders);
  }

  doDelete () {
    return this.doMethod('DELETE');
  }

  doPatch () {
    return this.doMethod('PATCH');
  }

  doPostUseContentTypeJson () {
    return this.doMethodUseHeaders('POST', {
      'Content-Type': 'application/json',
    });
  }
}
