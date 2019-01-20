/**
 * Created by Administrator on 2018/7/11 0011.
 */
export const alertMixin = {
  data () {
    return {
      alertState: false
    }
  },
  methods: {
    close(){
      this.alertState = false;
    },
    show() {
      this.alertState = true
    }
  }
};
