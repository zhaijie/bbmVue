import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import axios from 'axios';
import http from './api/http';
import utils from './utils/utils'

Vue.config.productionTip = false;
Vue.prototype.http = http;
Vue.prototype.$utils = utils;
Vue.prototype.$vue = new Vue;

import Message from './components/public/message/message'
Vue.use(Message);

router.afterEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (to.meta.title) {
    document.title = '币家交易所--' + to.meta.title;
  }
});

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  axios,
  components: {App},
  template: '<App/>'
});

export default app.$router;



