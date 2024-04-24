import http from '../utils/http/request';

let urls: string;

if (process.env.NODE_ENV === 'development') {
  //开发环境 do something
  urls = 'http://localhost:5174/api';
} else {
  //生产环境 do something
  urls = 'https://api.softwolf.cn';
}

// 登录
export const loginh = (adminname: string, adminpsw: string) => {
  const formData = new FormData();
  formData.append('adminname', adminname);
  formData.append('adminpsw', adminpsw);

  return http.post(urls + '/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 忘记密码
export const updatePsw = (adminname: string, newpsw: string) => {
  const formData = new FormData();
  formData.append('adminname', adminname);
  formData.append('newpsw', newpsw);
  return http.post(urls + '/updatePsw', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 获取所有题目
export const selectAllProblem = () => {
  return http.get(urls + '/problem/selectAllProblem');
};

// 获取指定类别的题目，例如简单
export const selectbyRankProblem = (rank: string) => {
  return http.get(urls + '/problem/selectbyRankProblem', { params: { rank: rank } });
};

// 模糊查询题目，例如减号，题目参数
export const selectbySymbolProblem = (symbol: string) => {
  return http.get(urls + '/problem/selectbySymbolProblem', { params: { symbol: symbol } });
};

// 搜索框模糊查询
export const selectProblem = (key: string) => {
  return http.get(urls + '/problem/selectProblem', { params: { key: key } });
};

// 更新题目
export const updateProblem = (data: object) => {
  return http.put(urls + '/problem/updateProblem', { ...data });
};

// 删除题目
export const deleteProblem = (problemid: string) => {
  return http.delete(urls + '/problem/deleteProblem', {
    data: {
      problemid
    }
  });
};

// 添加题目
export const setTask = (data: object) => {
  return http.post(urls + '/problem/addProblem', { ...data });
};
