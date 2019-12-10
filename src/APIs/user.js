//axios是http请求的框架，用于发送请求
import axios from 'axios'
//QS为json对象转为字符串的函数，如果直接{params}不能成功
//就参考entity里的QS括起来就行
// import { QS } from './global'

//同步接口的调用示例见User.vue组件中的script部分

export const login = (username, password) => {
  return axios({
    method: 'GET',
    url: `/api/user/login`,
    data: { username,password },
  })
}

export const register = (username, nickname, password, userEmail) => {
  return axios({
    method: 'POST',
    url: `/api/user/register`,
    data: { username, nickname, password, userEmail },
  })
}

export const getUserInfo = (userId) => {
  return axios({
    method: 'GET',
    url: `/api/user/getUserInfo`,
    data: { userId },
  })
}
