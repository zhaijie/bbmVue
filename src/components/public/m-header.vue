<template>
  <header>
    <div class="container clearfix">
      <router-link to="/index"><img src="../../assets/images/logo.png" class="bbm_fl loge_img"></router-link>
      <ul class="nav">
        <li v-for="item in navList" :class="{'active':item.url === currentNav}" @click="$router.push(item.url)">
          {{item.title}}
        </li>
      </ul>

      <div class="user_header bbm_fr">
        <div class="user_menu" v-if="$store.state.loginState">
          <img src="../../assets/images/icon_user.png" class="fl"> {{userInfo.username}}
          <ul>
            <li>
              <router-link to="/user/info">个人中心</router-link>
            </li>
            <li>
              <router-link to="/user/assets">财务中心</router-link>
            </li>
            <li>
              <router-link to="/user/realName">账号安全</router-link>
            </li>
            <li><a @click="quitLogin()">安全退出</a></li>
          </ul>
        </div>
        <div v-if="!$store.state.loginState">
          <a @click="quitLogin()">登录</a>
          <router-link to="/form/1" class="register">注册</router-link>
        </div>
      </div>
    </div>

  </header>
</template>
<style>
  @import "../../assets/css/public/header.css";
</style>
<script>

  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        lang: localStorage.lang || 'cn',
        userInfo: {},
        navList: [],
        currentNav: 0
      }
    },

    methods: {
//      //切换语言
//      switchLang(){
//        this.lang = this.lang === 'cn' ? 'en' : 'cn';
//        localStorage.lang = this.$i18n.locale = this.lang
//      },

      //退出登录
      quitLogin(){
        window.localStorage.removeItem('userInfo');
        this.$store.commit('SET_LOGIN_STATE', false);
        this.$router.push('/form/0')
      }
    },
    watch: {
      $route(to, from){
        this.currentNav = to.path;
        if (to.path === '/index' && from.path === '/form/0') {
          this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        }
      }
    },
    created(){
      this.navList = this.$t('navData');
      this.currentNav = this.$route.path;

      let userInfo = window.localStorage.getItem('userInfo');
      if (userInfo === null) {
        this.$store.commit('SET_LOGIN_STATE', false)
      } else {
        this.userInfo = JSON.parse(userInfo);
        this.$store.commit('SET_LOGIN_STATE', true)
      }
    },
  }
</script>



