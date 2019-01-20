/**
 * Created by Administrator on 2018/6/28 0028.
 */
import * as types from './mutation-types';
import http from '../api/http';

const actions = {
  [types.GET_PART_INFO]({commit, state}) {
    return new Promise((resolve) => {
      if (state.partInfo.length) {
        resolve();
        return;
      }
      http.post('/app/trading/getPartition', '', function (data) {
        commit(types.GET_PART_INFO, data);
        window.sessionStorage.setItem('fqId', data.item[0].partId);
        resolve()
      });
    })
  },

  [types.GET_BBC_LIST]({commit, state}, callback) {
    if (state.bbcList.length) {
      callback(state.bbcList);
      return;
    }
    http.post('/app/user/getBbc', '', function (data) {
      commit(types.GET_BBC_LIST, data);
      callback(data)
    });
  },

};

export default actions
