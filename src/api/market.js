/**
 * Created by Administrator on 2018/6/26 0026.
 */

import http from './http';

//根据分区id获取市场行情
export function getMarket(fqId, callback) {
  http.get('/getMarketList', {fqid: fqId}, function (data) {
    callback(data)
  });
}
