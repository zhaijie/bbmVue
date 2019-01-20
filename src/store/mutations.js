import * as types from './mutation-types'

const mutations = {
  [types.SET_FOOTER_SHOW](state, footerState) {
    state.footerShow = footerState
  },

  [types.SET_LOGIN_STATE](state, loginState) {
    state.loginState = loginState
  },

  [types.GET_PART_INFO](state, data) {
    state.partInfo = data.item.reverse();
  },

  [types.GET_BBC_LIST](state, data) {
    state.bbcList = data;
  },

};

export default mutations
