<template>
  <div id="app">
    <m-header></m-header>
    <router-view></router-view>
    <m-footer v-if="$store.state.footerShow"></m-footer>
  </div>
</template>

<script type="text/ecmascript-6">

  import MHeader from './components/public/m-header'
  import MFooter from './components/public/m-footer'
  export default {
    name: 'App',
    components: {
      MHeader,
      MFooter,
    }
  }
</script>

<style>

  @import "./assets/css/public/reset.css";
  @import "./assets/css/public/common.css";
  @import "./assets/css/animation.css";
  @import "./assets/css/public/alert.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
