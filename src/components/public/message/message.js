/**
 * Created by Administrator on 2018/7/30 0030.
 */

import Vue from 'vue'

const MessageConstructor = Vue.extend(require('./message.vue').default); // 直接将Vue组件作为Vue.extend的参数
const MessageInstance = new MessageConstructor({
  data: {
    confirmInfo: {},
    alertState: false
  }
});

export default {
  install: (content, alertState) => {
    if (alertState) {
      MessageInstance.confirmInfo = content;
      MessageInstance.alertState = alertState;
      // 实例化一个带有content内容的
      MessageInstance.vm = MessageInstance.$mount(); //挂载但是并未插入dom，是一个完整的Vue实例
      MessageInstance.vm.visible = true;
      MessageInstance.dom = MessageInstance.vm.$el;
      document.body.appendChild(MessageInstance.dom);
    }
  },

  create(content, alertState){
    this.install(content, alertState);
  }
}
