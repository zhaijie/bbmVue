/**
 * Created by Administrator on 2018/9/13 0013.
 */
import http from './http';


//意见反馈
export function suggestion(params, successCallBack) {
  http.post('/app/feedback/add', params, function (data, mes) {
    successCallBack(data, mes)
  });
}

//问题列表
export function problemList() {
  return [
    {id: 1, title: '登录注册', list: [{id: 10, title: '用户如何注册'}]},
    {id: 2, title: '关于交易', list: [{id: 11, title: 'CNT说明'}]},
    {id: 3, title: '充值提现', list: [{id: 12, title: '如何充值'}]},
    {id: 4, title: '账户锁定', list: []},
    {id: 5, title: '转入转出', list: [{id: 13, title: '如何转入虚拟币'}]},
    {id: 6, title: '服务支持', list: []}
  ]
}

//问题列表
export function problemContentById(id) {
  let problemContent = [
    {parentId: 0, id: 1, title: '平台相关', time: '2018-03-13'},
    {parentId: 0, id: 2, title: '平台简介', time: '2018-03-13'},
    {parentId: 0, id: 3, title: '联系我们', time: '2018-03-13'},
    {parentId: 0, id: 4, title: '网站地图', time: '2018-03-13'},
    {parentId: 0, id: 5, title: '用户协议', time: '2018-03-13'},
    {parentId: 0, id: 7, title: '隐私政策', time: '2018-03-13'},
    {parentId: 0, id: 8, title: '防洗钱', time: '2018-03-13'},
    {parentId: 0, id: 9, title: '风险协议', time: '2018-03-13'},
    {parentId: 1, id: 10, title: '用户如何注册', time: '2018-03-13'},
    {parentId: 2, id: 11, title: 'CNT说明', time: '2018-03-13'},
    {parentId: 3, id: 12, title: '如何充值', time: '2018-03-13'},
    {parentId: 5, id: 13, title: '如何转入虚拟币', time: '2018-03-13'},
  ];

  for (let item of problemContent) {
    if (parseInt(id) === item.id) {
      return item
    }
  }
}


