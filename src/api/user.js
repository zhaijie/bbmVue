/**
 * Created by Administrator on 2018/7/10 0010.
 */

import http from './http';
import {cipherText} from '../utils/utils'

//获取用户信息
export function getUserAll(successCallBack) {
  http.post('/app/user/getUserAll', '', function (data) {
    data.safetyGrade = 2;
    data.gradeText = '低';
    let userInfoStr = window.localStorage.getItem('userInfo');
    if (userInfoStr) {
      data.username = cipherText(JSON.parse(userInfoStr).username);
    }

    if (data.jypwd === '1') { //是否设置交易密码
      data.safetyGrade++;
    }

    if (data.zjh) {  //是否实名认证
      data.safetyGrade++;
    }

    if (data.google === '1') { //是否认证
      data.safetyGrade++;
    }

    //判断等级
    if (data.safetyGrade === 3) {
      data.gradeText = '中';
    }
    if (data.safetyGrade > 3) {
      data.gradeText = '高';
    }

    data.safetyGrade = data.safetyGrade * 20;
    successCallBack(data)
  });
}
//获取商户信息
export function merchantOrderList(params, successCallBack) {
  http.post('/app/c2cOrder/merchantOrderList', params, function (data) {
    successCallBack(data)
  });
}

//侧边栏菜单
export function getMenuList() {
  return [
    {
      menuTitle: '个人中心', menuIcon: require('../assets/images/icon_geren.png'),
      submenu: [
        {title: '我的信息', url: '/user/info', isShow: false},
        {title: '钱包地址', url: '/user/wallet', isShow: true},
        {title: '我的银行卡', url: '/user/bankCard'}]
    },
    {
      menuTitle: '资产管理', menuIcon: require('../assets/images/icon_zc.png'),
      submenu: [
        {title: '我的资产', url: '/user/assets'},
        {title: 'C2C交易', url: '/user/c2c'},
        {title: '转入数字资产', url: '/user/turnIn'},
        {title: '转出数字资产', url: '/user/turnOut'},
        {title: '委托管理', url: '/user/entrust'},
        {title: '成交记录', url: '/user/record'}
      ]
    },
    {
      menuTitle: '账号安全',
      menuIcon: require('../assets/images/icon_safe.png'),
      submenu: [
        {title: '实名认证', url: '/user/realName'},
        {title: '谷歌认证', url: '/user/google'},
        {title: '登录密码', url: '/user/changePassword/1'},
        {title: '交易密码', url: '/user/changePassword/2'},
        {title: '交易设置', url: '/user/setTrade'}]
    },
  ]
}

//获取添加银行卡表单信息
export function getAddCardForm(selectCallBack, bankList) {
  let username = JSON.parse(window.localStorage.getItem('userInfo')).account;
  let selectList = [];

  for (let item of bankList) {
    let obj = {};
    obj.enName = item.bankName;
    obj.id = item.id;
    selectList.push(obj)
  }

  return [
    {
      type: 'select',
      title: '开户银行',
      selectList: {
        handle: selectCallBack,
        data: selectList
      }
    },
    {type: 'text', title: '开户支行', value: ''},
    {type: 'text', title: '开户姓名', value: username, readonly: true, addClass: ['border0']},
    {type: 'text', title: '银行卡号', value: ''},
  ]
}

//获取添加钱包表单信息
export function getWalletForm(selectCallBack, walletList) {
  return [
    {
      type: 'select',
      title: '币种名称',
      selectList: {
        handle: selectCallBack,
        data: walletList
      }
    },
    {type: 'text', title: '钱包标签', value: ''},
    {type: 'text', title: '钱包地址', value: ''},
    {type: 'password', title: '交易密码', value: ''},
  ]
}

//获取C2C表单信息
export function getC2CForm() {
  return [
    {
      type: 'select',
      title: '汇款银行',
      selectList: {
        data: [{id: 1, enName: '请选择1'}, {id: 2, enName: '请选择2'}, {id: 3, enName: '请选择3'}]
      }
    },
    {type: 'text', title: '买入价格', value: '1', addClass: ['bold', 'rise', 'borderFocus0'], readonly: true},
    {type: 'text', title: '买入数量', value: '100', addClass: ['bold', 'rise']},
  ]
}

//获取钱包地址
export function getAddress(id, callBack) {
  http.post('/app/balance/getAddress', {dbid: id}, function (data) {
    callBack(data)
  });
}

//获取用户银行卡信息
export function getBankCard(callBack) {
  http.post('/app/c2c/searchBank', {}, function (data) {
    callBack(data)
  });
}

//获取所有银行信息
export function getBanks(callBack) {
  http.post('/app/c2c/searchBanks', {}, function (data) {
    callBack(data)
  });
}

//删除银行卡
export function delBank(callBack) {
  http.post('/app/c2c/delBank', {}, function (data) {
    callBack(data)
  });
}

//委托管理
export function entrustRecord(params, callBack) {
  http.post('/app/trading/entrustRecord', params, function (data) {
    callBack(data)
  });
}

//成交记录
export function tradingRecord(params, callBack) {
  http.post('/app/trading/tradingRecord', params, function (data) {
    callBack(data)
  });
}







