import http from '../utils/http/request';

let urls: string;

if (process.env.NODE_ENV === 'development') {
  //开发环境 do something
  urls = '';
} else {
  //生产环境 do something
  urls = 'https://api.softwolf.cn';
}

// 登录
export const loginh = (userData: any) => {
  return http.post(urls + '/admin/register', userData);
};
