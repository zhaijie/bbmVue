<template>
  <div class="menu_box">
    <div class="menu_item" v-for="item1 in menuList">
      <div class="item_title">
        <img :src="item1.menuIcon">
        {{item1.menuTitle}}
      </div>
      <ul>
        <li v-for="item2 in item1.submenu" @click="switchMenu(item1.menuTitle,item2,item1.submenu[0].url)">
          <router-link :to="item2.url" :class="{'active':menuUrl === item2.url}">
            {{item2.title}}
          </router-link>
          <img src="../../assets/images/menu_more.png" class="menu_active_img"
               v-if="menuUrl === item2.url">
        </li>
      </ul>
    </div>
  </div>

</template>

<style>
  @import "../../assets/css/public/menu.css";
</style>

<script type="text/ecmascript-6">
  export default {
    props: ['menuList', 'menuUrl'],
    data() {
      return {
        menuTitle: ''
      }
    },
    methods: {
      switchMenu(menuTitle, item, firstUrl){
        this.$emit('currentMenuTitle', menuTitle, item.title, firstUrl)
      }
    }
  }
</script>


