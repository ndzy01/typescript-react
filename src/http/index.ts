import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../config';
import { useRequest } from 'ahooks';

const isMock: boolean = process.env.NODE_ENV === 'development' ? true : false;

const http = axios.create({
  baseURL: isMock ? baseUrl.mockUrl : baseUrl.urlOnLine,
  timeout: 60000, // 请求超时时间
});

//添加一个响应拦截器
http.interceptors.response.use(
  function (response) {
    if (response.data.status === 500) {
      return Promise.reject('服务器出错！');
    }
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export const useAxiosReq = (options?: any) =>
  useRequest((param) => param, {
    requestMethod: (param: any) => http(param),
    formatResult: (res: AxiosResponse) => res.data,
    ...options,
  });

export const useLazyAxiosReq = (options?: any) =>
  useRequest((param) => param, {
    manual: true,
    requestMethod: (param: any) => http(param),
    formatResult: (res: AxiosResponse) => res.data,
    ...options,
  });
export default http;
