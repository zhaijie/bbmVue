<template>
  <div class="index_box">

    <banner :bannerData="bannerData"></banner>

    <div class="notice">
      <span class="title">[公告]</span>
      <a href="#"><span class="time">2018-05-31</span> 币家网2.0时代开启！全新升级全新体验！</a>
      <a class="notice_more" href="#">查看更多 >></a>
    </div>

    <div class="currency_list">
      <div class="currency_table container">
        <div class="currency_transaction clearfix">
          <button :class="{'active':item.partId == currentPart}" v-for="(item, i) in partInfo"
                  @click="partTabs(item.partId)">
            {{item.partName}}交易区
          </button>
        </div>

        <div :style="{'height':(marketSize+1)*60+'px'}">
          <table cellpadding="0" cellspacing="0">
            <thead>
            <tr class="color9393B1">
              <td width="177">币种</td>
              <td width="180">最新价</td>
              <td width="180">24h涨跌幅</td>
              <td width="180">24h最高价</td>
              <td width="178">24h最低价</td>
              <td width="180">成交量</td>
              <td>操作</td>
            </tr>
            </thead>

            <transition-group name="list" tag="tbody" appear>
              <tr v-for="item in marketInfo" :key="item.scid" v-show="item"
                  @click="$router.push('/transaction/'+item.scid)">
                <td>
                  <img :src="item.tblj" width="30">
                  <span class="currency_name">{{item.ywm_s}}</span>
                </td>
                <td>
                  <p>{{item.dqj}}</p>
                  <p class="color9393B1">≈￥{{item.dqj_cny}}</p>
                </td>
                <td :class="item.rzd >=0?'rise':'fall'">
                  <transition name="currency-fade" appear>
                    <span v-if="animationState.fadeShow">{{item.rzd}}%</span>
                  </transition>
                </td>
                <td>{{item.zgj}}</td>
                <td>{{item.zdj}}</td>
                <td>{{item.cjl}}</td>
                <td>
                  <router-link :to="'/transaction/'+item.scid">去交易</router-link>
                </td>
              </tr>
            </transition-group>
          </table>
        </div>
      </div>
    </div>

    <div class="introduce">
      <div class="container clearfix">
        <div class="introduce_item" v-for="item in introduceList">
          <img :src="item.introduceImg" class="bbm_fl" width="120">
          <div class="bbm_fl">
            <span>{{item.title}}</span>
            <p class="first_p">{{item.dec1}}</p>
            <p>{{item.dec2}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="information container">
      <div class="information_list clearfix">
        <div class="information_item">
          <a href="">
            <img src="../assets/images/kj02.png" width="282">
            <p>随手丢掉7500个比特币是一种什么样的体验？</p>
            <p><span>[热点]</span> <span class="fr">2018-05-31</span></p>
          </a>
        </div>

        <div class="information_item">
          <a href="">
            <img src="../assets/images/kj02.png" width="282">
            <p>随手丢掉7500个比特币是一种什么样的体验？</p>
            <p><span>[热点]</span> <span class="fr">2018-05-31</span></p>
          </a>
        </div>

        <div class="information_item">
          <a href="#">
            <img src="../assets/images/kj02.png" width="282">
            <p>随手丢掉7500个比特币是一种什么样的体验？</p>
            <p><span>[热点]</span> <span class="fr">2018-05-31</span></p>
          </a>
        </div>

        <div class="information_item">
          <a href="#">
            <img src="../assets/images/kj02.png" width="282">
            <p>随手丢掉7500个比特币是一种什么样的体验？</p>
            <p><span>[热点]</span> <span class="fr">2018-05-31</span></p>
          </a>
        </div>
      </div>
      <div class="information_more">查看更多</div>
    </div>

  </div>
</template>

<style scoped src="../assets/css/index.css">
  /*@import "../assets/css/index.css";*/
</style>

<script>

  import Banner from './public/banner.vue';
  import {marketMixin} from '../utils/marketMixin';
  import * as indexServer from '../api/index'

  export default {
    mixins: [marketMixin],
    data () {
      return {
        bannerData: [],  //banner信息
        introduceList: [],
        marketTimer: ''
      }
    },
    methods: {},
    created(){
      this.bannerData = indexServer.getBanner();
      this.introduceList = indexServer.getIntroduce();
    },
    mounted (){
      let self = this;
      self.marketTimer = setInterval(function () {
        self.animationState.fadeShow = !self.animationState.fadeShow;
      }, 3000)
    },
    destroyed (){
      clearInterval(this.marketTimer)
    },
    components: {
      Banner
    }
  }
</script>


