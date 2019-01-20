<template>
  <div class="banner">
    <div class="container">
      <div class="banner_box">
        <img :src="currentBannerImg" :class="{fade_in:showBannerImg}">
      </div>
      <div class="banner_list clearfix">
        <div class="banner_item" v-for="(v, i) in bannerData" @mouseenter="mouseEnter($event,i)"
             @mouseleave="mouseLeave($event)">
          <a>
            <img :src="v.bannerItemImg">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  @import "../../assets/css/public/banner.css";

</style>

<script type="text/ecmascript-6">
  export default {
    props: ['bannerData'],
    data(){
      return {
        currentBannerImg: this.bannerData[0].bannerImg,
        showBannerImg: true
      }
    },
    methods: {
      mouseEnter($event, i){
        this.showBannerImg = true;
        $event.currentTarget.className = 'banner_item banner_rise';
        this.currentBannerImg = this.bannerData[i].bannerImg;
      },
      mouseLeave($event){
        this.showBannerImg = false;
        $event.currentTarget.className = 'banner_item banner_fall';
      },
    }
  }
</script>



