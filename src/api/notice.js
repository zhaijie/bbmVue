/**
 * Created by Administrator on 2018/9/13 0013.
 */
import http from './http';

//公告列表
export function announcementList(params, successCallBack) {
  http.post('/app/home/announcementList', params, function (data) {
    successCallBack(data)
  });
}

//资讯列表
export function consultList(params, successCallBack) {
  http.post('/app/home/consultList', params, function (data) {
    successCallBack(data)
  });
}

//系统消息
export function msgList(params, successCallBack) {
  http.post('/app/msg/msgList', params, function (data) {
    successCallBack(data)
  });
}

