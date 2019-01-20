<template>
  <div class="form_content">
    <transition name="form-animation" appear v-if="animationState">
      <div class="form_box" @keyup.enter="login()">

        <div style="position: relative" v-for="item in formData">
          <m-input :inputInfo="item" :key="item.name" v-model="item.value" @getCode="getCode"></m-input>

          <transition name="list" appear>
            <div class="check_tip" v-if="item.check">{{item.errorText}}</div>
          </transition>
        </div>

        <p class="color9393B1 margin_b15" v-if="type === '1'">注册即视为同意 <span>《用户注册协议》</span></p>

        <button class="btn login_btn" @click="formSubmit()">
          {{type === '0' ? '登录' : type === '1' ? '注册' : '重置登录密码'}}

        </button>

        <p class="err_info">{{errorText}}</p>

        <div class="clearfix">
          <p class="bbm_fl" v-if="type === '0'">
            <input type="checkbox">记住用户名
          </p>
          <p class="bbm_fr" v-if="type === '0'">
            <router-link to="/form/2">忘记密码 </router-link>
            |
            <router-link to="/form/1">注册</router-link>
          </p>
          <p class="color9393B1 text-center" v-if="type === '1'">已有账号？
            <router-link to="/form/0">立即登录</router-link>
          </p>
        </div>
      </div>
    </transition>

    <div class="form_box register_go" v-if="registerState">
      <div class="reg_done"><img src="../assets/images/reg_done.png" width="74"/></div>
      <p class="register_text">恭喜您注册成功</p>
      <button class="btn register_go_user" @click="$router.push('/user/info')">查看我的个人中心</button>
    </div>
  </div>
</template>

<style src="../assets/css/login.css">

</style>

<script type="text/ecmascript-6">

  import {mapMutations} from 'vuex'
  import MInput from '../components/public/m-input'
  import * as loginRegisterServer from '../api/loginRegister'
  import {getCode} from '../utils/utils'

  export default {
    data () {
      return {
        formData: [],
        animationState: false,
        errorText: '',
        type: '',
        registerState: false //是否注册成功
      }
    },
    methods: {
      ...mapMutations({
        footerShow: 'SET_FOOTER_SHOW', //vuex将`this.footerShow()`映射为`this.$store.commit('SET_FOOTER_SHOW')`
        loginState: 'SET_LOGIN_STATE'
      }),
      getCode(callback){
        //检测是否输入图像验证码
        if (this.checkInputVal([this.formData[4]])) {
          let sendData = {
            phone: this.formData[0].value,
            type: this.type,
            imageCode: this.formData[4].value
          };
          let self = this;
          getCode(sendData, function (data, meg) {
            if (!data) {
              self.formData[4].errorText = meg;
              self.showCheck(self.formData[4]);
              self.formData[4].value = '';
            } else {
              callback();
            }
          })
        }
      },

      //表单提交
      formSubmit(){
        let username = this.formData[0].value,
          password = this.formData[1].value;
        if (this.checkInputVal(this.formData)) {
          if (this.type === '0') {  //登录提交
            this.login({username: username, password: password});
          } else if (this.type === '1') { //注册提交
            let sendData = {
              phone: username,
              passWord: password,
              userCode: this.formData[3].value,
              code: this.formData[5].value
            };
            this.register(sendData)
          } else {  //忘记密码
            let sendData = {
              username: this.formData[0].value,
              password: this.formData[1].value,
            };
            this.reset(sendData)
          }
        }
      },

      //登录
      login(sendData){
        let self = this;
        loginRegisterServer.login(sendData, function (data, msg) {
          if (!data) {
            self.errorText = msg;
            return
          }
          self.loginState(true);
          self.$router.push('/index');
        });
      },

      //注册
      register(sendData){
        let self = this;
        loginRegisterServer.register(sendData, function (data, meg) {
          if (data) {
            self.animationState = false;
            self.registerState = true;
            return
          }
          self.errorText = meg;
        })
      },

      //忘记密码
      reset(){
        console.log('忘记密码')

      },
      //检测输入框输入的值
      checkInputVal(info){
        for (let item of  info) {
          if (item.name === 'username') {
            item.errorText = loginRegisterServer.checkPhone(item.value);
            if (item.errorText) {
              this.showCheck(item);
              return false;
            }
          }

          if (item.value.length === 0 && item.name !== 'inviteCode') {
            item.errorText = item.placeholder;
            this.showCheck(item);
            return false;
          }
        }
        return true
      },

      //显示输入框错误提示
      showCheck(info){
        if (info.errorText) {
          info.check = true;
          //3秒后隐藏
          setTimeout(function () {
            info.check = false;
          }, 3000)
        }
      },

      //注册登录切换
      loginOrRegister(type){
        let self = this;
        setTimeout(function () {
          self.animationState = true;
        }, 10);

        this.formData = loginRegisterServer.getFormData(type);
      }
    },
    created (){
      this.footerShow(false);
      this.type = this.$route.params.type;
      this.loginOrRegister(this.type);
    },
    watch: {
      '$route' () {
        this.animationState = false;
        this.errorText = '';
        this.type = this.$route.params.type;
        this.loginOrRegister(this.type)
      }
    },
    destroyed(){
      this.footerShow(true);
    },
    components: {MInput}
  }
</script>

