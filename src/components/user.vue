<template>

  <div class="common_container" @click="hideSelect()">
    <div class="container clearfix">
      <m-menu class="bbm_fl" :menuUrl="currentMenuUrl" :menuList="menuList" @currentMenuTitle="getCrumbsInfo"></m-menu>

      <div class="common_content">
        <div class="common_title">
          <router-link to="/index">首页</router-link>
          >
          <router-link :to="crumbsUrl">{{menuTitle}}</router-link>
          > <span>{{crumbsTitle}}</span>
        </div>

        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="trans_img"></div>
  </div>
</template>

<style src="../assets/css/user.css">
</style>

<script>
  import MMenu from './public/m-menu';
  import ConfirmAlert from '../components/public/message/message';
  import {getMenuList} from '../api/user';
  import {menuMixin} from '../utils/menuMixin';

  export default {
    mixins: [menuMixin],
    data () {
      return {}
    },
    methods: {
      hideSelect(){
        this.$vue.$emit('hideSelectList')
      }
    },

    created(){
      if (!this.$store.state.loginState) {
        this.$router.push('/form/0');
        ConfirmAlert.create({
          content: '请先登录',
          button: [
            {
              text: '确定',
              addClass: ['confirm_btn'],
              handle: function () {
              }
            },
          ]
        }, true);
      }

      this.menuList = getMenuList(); //获取侧边菜单信息
    },
    components: {MMenu}
  }
</script>

