/**
 * Created by Administrator on 2018/7/12 0012.
 */

import http from './http';

//登录
export function login(params, callback) {
  http.post('/login', params, function (data) {
    if (typeof data === 'string') {
      callback(false, data);
      return
    }
    //储存用户信息
    data.username = params.username;
    window.localStorage.setItem('userInfo', JSON.stringify(data));
    callback(data)
  })
}

//注册
export function register(params, callback) {
  http.post('/app/user/register', params, function (data) {
    callback(data)
  })
}

//获取表单信息
export function getFormData(id) {
  let formData = {
    loginForm: {
      id: '0', form: [
        {name: 'username', placeholder: '手机号码/邮箱', value: '', width: '358', type: 'text', check: false, errorText: ''},
        {
          name: 'password',
          placeholder: '请输入登录密码',
          value: '',
          width: '358',
          type: 'password',
          check: false,
          errorText: ''
        },
        {name: 'imgCode', placeholder: '请输入图形验证码', value: '', width: '230', type: 'text', check: false, errorText: ''}
      ]
    },
    registerForm: {
      id: '1', form: [
        {
          name: 'username',
          placeholder: '手机号码/邮箱',
          value: '',
          width: '358',
          type: 'text',
          check: false,
          errorText: ''
        },
        {
          name: 'password',
          placeholder: '请设置6-16位数字或字母的登录密码',
          value: '123456',
          width: '358',
          type: 'password',
          check: false,
          errorText: ''
        },
        {
          name: 'againPassword',
          placeholder: '重复输入密码',
          value: '123456',
          width: '358',
          type: 'password',
          check: false,
          errorText: ''
        },
        {name: 'inviteCode', placeholder: '请输入邀请码', value: '', width: '358', type: 'text', check: false, errorText: ''},
        {name: 'imgCode', placeholder: '请输入图形验证码', value: '', width: '230', type: 'text', check: false, errorText: ''},
        {name: 'getCode', placeholder: '请输入验证码', value: '', width: '230', type: 'text', check: false, errorText: ''}
      ]
    },
    resetForm: {
      id: '2', form: [
        {name: 'username', placeholder: '手机号码/邮箱', value: '', width: '358', type: 'text'},
        {name: 'password', placeholder: '请设置登录密码', value: '', width: '358', type: 'password'},
        {name: 'againPassword', placeholder: '重复输入密码', value: '', width: '358', type: 'password'},
        {name: 'imgCode', placeholder: '请输入图形验证码', value: '', width: '230', type: 'text'},
        {name: 'getCode', placeholder: '请输入验证码', value: '', width: '230', type: 'text'},
      ]
    }
  };

  for (let item in formData) {
    if (formData[item].id === id) {
      return formData[item].form;
    }
  }
  return [];
}

//检测表单信息
export function checkPhone(phone) {
  let check_phone_number = /^1\d{10}$/;
  let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (phone.length === 0) {
    return '账号不能为空';
  }
  if (phone.indexOf('@') !== -1) {
    if (!myreg.test(phone)) {
      return '请输入有效的邮箱！';
    }
  } else {
    if (phone.length !== 11) {
      return '请输入有效的手机号！';
    }
    if (!phone.match(check_phone_number)) {
      return '请输入有效的手机号';
    }
  }
  return false;
}


