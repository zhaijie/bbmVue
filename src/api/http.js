/**
 * Created by Administrator on 2018/5/22 0022.
 */
import axios from 'axios';
import {api, get_api} from './api';
import state from '../store/state'

// 请求时的拦截
axios.interceptors.request.use(function (config) {
  // 发送请求之前做一些处理
  return config;
}, function (error) {
  // 当请求异常时做一些处理
  console.log("请求异常处理：" + error);
  return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  // console.log('返回响应:' + JSON.stringify(response));
  return response;
}, function (error) {
  // 当响应异常时做一些处理
  console.log('当响应异常时:' + error);
  return Promise.reject(error);
});

//设置默认请求头
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.timeout = 30000;
let authorization;

export default {
  //get请求
  get (url, param, successCallBack) {
    let apiUrl = get_api + url;
    console.log('当前请求参数:' + JSON.stringify(param));
    axios.get(apiUrl, {params: param}).then(res => {
      console.log(apiUrl + '返回结果: ');
      console.log(res.data);
      successCallBack(res.data)
    }).catch(err => {
      successCallBack(err)
    })
  },
  //post请求
  post (url, param, successCallBack) {
    let apiUrl = api + url;
    if (!authorization) {
      authorization = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')).tmd : '';
    }

    let sendData = {method: 'post', url: apiUrl, headers: {'Authorization': authorization}};
    if (url === '/login') {
      sendData.data = param
    } else {
      sendData.params = param;
    }
    axios(sendData).then(res => {
      console.log(apiUrl + '返回结果: ');
      console.log(res.data);
      if (res.data.retcode === 0) {
        successCallBack(res.data.data)
      } else if (res.data.retcode === 10003) {
        state.loginState = false;
        window.localStorage.clear();
        successCallBack(false, res.data.msg)
      } else {
        successCallBack(false, res.data.msg);
      }
    }).catch(err => {
      console.log(apiUrl + '请求错误');
    })
  }
}
