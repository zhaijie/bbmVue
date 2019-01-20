/**
 * Created by Administrator on 2018/7/11 0011.
 */
export const menuMixin = {
  data () {
    return {
      menuList: [],
      crumbsTitle: '',
      menuTitle: '',
      crumbsUrl: '',
      currentMenuUrl: '',
    }
  },
  methods: {
    //获取面包屑信息
    setCrumbsInfo(menuTitle, title, menuUrl){
      this.menuTitle = menuTitle;
      this.crumbsTitle = title;
      this.crumbsUrl = menuUrl
    },

    //设置面包屑信息
    getCrumbsInfo(){
      let currentUrl = this.$route.path;
      if (currentUrl === '/user/c2cOrderDetails') {
        currentUrl = this.currentMenuUrl = '/user/c2c'
      }
      for (let item of this.menuList) {
        for (let item2 of item.submenu) {
          if (item2.url === currentUrl) {
            this.setCrumbsInfo(item.menuTitle, item2.title, item.submenu[0].url)
          }
        }
      }
    }
  },
  mounted(){
    this.currentMenuUrl = this.$route.path; //获取当前路由
    this.getCrumbsInfo();
  },
  watch: { //监听路由，实时改变菜单选中状态和面包屑信息
    $route(to){
      this.currentMenuUrl = to.path;
      this.getCrumbsInfo();
    }
  },
};
