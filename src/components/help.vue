<template>

  <div class="common_container">
    <div class="container clearfix">
      <m-menu class="bbm_fl" :menuUrl="currentMenuUrl" :menuList="menuList" @currentMenuTitle="getCrumbsInfo"></m-menu>

      <div class="common_content help_content">
        <div class="common_title" v-if="commonTitle">
          <router-link to="/index">首页</router-link>
          >
          <router-link :to="crumbsUrl">{{menuTitle}}</router-link>
          > <span>{{crumbsTitle}}</span>
        </div>
        <router-view></router-view>
      </div>
    </div>

    <div class="trans_img"></div>
  </div>
</template>

<style>
  .help_content {
    height: 938px;
  }
</style>

<script>
  import MMenu from './public/m-menu';
  import {getHelpMenuList} from '../api/help';
  import {menuMixin} from '../utils/menuMixin';

  export default {
    mixins: [menuMixin],
    data () {
      return {
        commonTitle: true
      }
    },
    methods: {
    },
    created(){
      this.menuList = getHelpMenuList(); //获取侧边菜单信息
      if (this.$route.path === '/help/problem') {
        this.commonTitle = false;
      }
    },
    watch: { //监听路由，实时改变菜单选中状态和面包屑信息
      $route(to){
        if (to.path === '/help/problem') {
          this.commonTitle = false;
          return
        }
        this.commonTitle = true;
      }
    },
    components: {MMenu}
  }
</script>

