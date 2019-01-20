/**
 * Created by Administrator on 2018/6/5 0005.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from './langs'
Vue.use(VueI18n);

//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
// this.$i18n.locale // 通过切换locale的值来实现语言切换

const i18n = new VueI18n({
  locale: localStorage.lang || 'cn',
  messages,
});

export default i18n
