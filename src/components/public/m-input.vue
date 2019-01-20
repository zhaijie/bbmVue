<template>

  <div>
    <input ref="myInput" :placeholder="inputInfo.placeholder" :type="inputInfo.type" :value="value"
           @input="$emit('input', $event.target.value,$event.target)" :disabled="inputInfo.disabled">

    <img :src="imgCodeSrc" class="image_code" v-if="inputInfo.name == 'imgCode'" @click="changeImgCode()">
    <button class="btn code_btn" v-if="inputInfo.name  == 'getCode'" @click="$emit('getCode',getCode)">
      {{codeText}}
    </button>
  </div>

</template>

<script type="text/ecmascript-6">


  import {disableWait} from '../../utils/utils'
  import {api} from '../../api/api'

  export default {
    props: ['inputInfo', 'value'],
    data(){
      return {
        imgCodeSrc: api + '/app/user/imageCode',
        codeText: '获取验证码',
        timerState: false
      }
    },
    methods: {
      getCode(){
        let self = this;
        let timer = 60;
        if (self.timerState) {
          return
        }
        self.codeText = timer + 's';
        let codeTimer = setInterval(function () {
          self.timerState = true;
          timer--;
          self.codeText = timer + 's';
          if (timer < 0) {
            timer = 10;
            self.codeText = '重新获取';
            self.timerState = false;
            clearInterval(codeTimer)
          }
        }, 1000);
      },
      //点击切换验证码图片
      changeImgCode(){
        this.imgCodeSrc = this.imgCodeSrc + '?time=' + new Date().getTime()
      }
    },
    mounted(){
      if (this.inputInfo.width) {
        this.$refs.myInput.style.width = this.inputInfo.width + 'px';
      }
    },
  }
</script>


