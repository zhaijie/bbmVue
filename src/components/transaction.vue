<template>
  <div>
    <div class="container">
      <!--市场行情-->
      <div class="transaction_top clearfix">
        <div class="left bbm_fl">
          <div class="currency_tabs clearfix">
            <span :class="{'active':currentPart == item.partId}" v-for="item in partInfo"
                  @click="partTabs(item.partId)">
            {{item.partName}}
            </span>
          </div>
          <div class="scrollbar transaction_currency">
            <transition-group name="list" tag="table" appear cellspacing="0" cellpadding="0">
              <tr v-for="item in marketInfo" :key="item.scid" v-show="item" @click="marketSwitch(item.scid)">
                <td width="80"><span>{{item.ywm_s}}</span></td>
                <td width="112">{{item.dqj}}</td>
                <td :class="item.rzd >=0?'rise':'fall'">{{item.rzd}}%</td>
              </tr>
            </transition-group>
          </div>
        </div>

        <!--k-线-->
        <div class="top_kLine bbm_fl">
          <div class="kLine_title">
            <img :src="currentMarket.tblj" width="24" class="bbm_fl">
            <span class="currency_name">{{currentMarket.ywm_s}}</span>
            <span class="price">最新价：
              <span :class="currentMarket.rzd >=0?'red':'greed'" @click="setBuySellPrice(currentMarket.dqj)">
                {{currentMarket.dqj}} {{currentMarket.ywm_m}}
              </span> ≈￥{{currentMarket.dqj_cny}}
            </span>
            <span>24h涨跌：<span :class="currentMarket.rzd >=0?'red':'greed'">{{currentMarket.rzd}}%</span></span>
            <span>24h最高：<span>{{currentMarket.zgj}}</span></span>
            <span>24h最低：<span>{{currentMarket.zdj}}</span></span>
            <span>成交量：<span>{{currentMarket.cjl}}</span></span>
            <img src="../assets/images/icon_refresh.png" class="bbm_fr"
                 @click="kLineSrc = kLineSrc+'?time='+new Date().getTime()">
          </div>

          <div class="kLine_box">
            <iframe height="438px" width="100%" class="k-iframe" id="Kline-change" :src="kLineSrc"></iframe>
          </div>
        </div>
      </div>

      <div class="transaction_bottom clearfix">
        <!--交易记录-->
        <div class="left bbm_fl">
          <div class="transaction_record">
            <div class="record_title">
              <span>成交时间</span>
              <span>价格</span>
              <span>数量</span>
            </div>
            <transition-group name="list" tag="table" appear>
              <tr v-for="(item, index) in recordList" :key="index" v-show="item">
                <td width="71">{{item.sj}}</td>
                <td width="83" :class="item.cs === 'sell'?'fall':'rise'">{{item.jg}}</td>
                <td>{{item.sl}}</td>
              </tr>
            </transition-group>
          </div>
        </div>

        <!--买卖输入框-->
        <div class="middle bbm_fl">
          <div class="clearfix buy_sell_input">
            <!--买-->
            <entrust-form :availableAssets="availableAssets.buy" :inputData="buySellInput.buyInput"
                          ref="buyForm" :buttonInfo="buttonInfo.buy">
            </entrust-form>
            <!--卖-->
            <entrust-form :availableAssets="availableAssets.sell" :inputData="buySellInput.sellInput"
                          ref="sellForm" :buttonInfo="buttonInfo.sell"></entrust-form>
          </div>
          <!--资产切换-->
          <div class="assets_tabs">
            <div class="bottom-tabs clearfix">
              <a v-for="item in assetsTabs" class="tabs-button" @click="assetsTabSwitch(item.id)"
                 :class="{'active':currentTab === item.id}">
                {{item.title}}
              </a>
              <span><router-link to="/user/assets" class="more_detail bbm_fr">更多明细</router-link></span>
            </div>

            <div class="bottom-tabs-box">
              <div class="bottom-tabs-content scrollbar">
                <!--未登录状态-->
                <div class="not-login" v-if="!$store.state.loginState">
                  <img src="../assets/images/trad_login.png" width="95">
                  <p>请先
                    <router-link to="/form/0">登录</router-link>
                    或
                    <router-link to="/form/1">注册</router-link>
                  </p>
                </div>
                <!--我的资产-->
                <div class="assets_content" v-if="assetsTabs[0].state">
                  <div class="title clearfix">
                    <p class="bbm_fl">总资产折合CNY：<span>￥10,000,000.00</span></p>
                  </div>
                  <table class="assets_table">
                    <tr>
                      <th width="100">币种</th>
                      <th width="180">折合CNY</th>
                      <th width="180">可用</th>
                      <th width="115">冻结</th>
                    </tr>
                    <!--<tr>-->
                    <!--<td><img src="../assets/images/CNT.png" width="18">CNT</td>-->
                    <!--<td>￥1000000000000.00</td>-->
                    <!--<td>100000.00</td>-->
                    <!--<td>1000000000000.00</td>-->
                    <!--</tr>-->
                  </table>
                </div>
                <!--我的委托-->
                <div class="assets_content" v-if="assetsTabs[1].state">
                  <div class="content1-title">
                    <span class="title">{{currentMarket.ywm_s}}/{{currentMarket.ywm_m}}</span>
                    <span class="screen" :class='{"active":!userEntrust.currentTab}'
                          @click="getUserEntrust(0)">全部</span>
                    <span class="screen" :class='{"active":userEntrust.currentTab === 1}'
                          @click="getUserEntrust(1)">买入</span>
                    <span class="screen" :class='{"active":userEntrust.currentTab === 2}'
                          @click="getUserEntrust(2)">卖出</span>
                  </div>

                  <table class="assets_table">
                    <tr class="title">
                      <th width="105" class="paddingLeft20">委托时间</th>
                      <th width="130">单价</th>
                      <th width="130">委托数量|<span class="turnover">已成交</span></th>
                      <th width="145">成交金额</th>
                      <th>操作</th>
                    </tr>

                    <tr v-for="item in userEntrust">
                      <td>
                        <p>
                          <span :style="{backgroundColor:item.type === 'MC' ? '#24A983' : '#A33856'}"
                                class="entrust_state_text">
                            {{item.type === 'MC' ? '卖' : '买'}}
                          </span>
                          {{item.date}}
                        </p>
                      </td>
                      <td>
                        <p class="colorD3D9E8">{{item.wtPic.toFixed(item.ws)}}</p>
                        <p>￥{{item.wtPic.toFixed(2)}}</p>
                      </td>
                      <td>
                        <p class="colorD3D9E8">{{item.wtNumber.toFixed(item.ws)}}</p>
                        <p>{{item.cjNumber.toFixed(item.ws)}}</p>
                      </td>
                      <td>
                        <p class="colorD3D9E8">{{item.cjMoney.toFixed(item.ws)}}</p>
                        <p>￥{{item.cjMoney.toFixed(2)}}</p>
                      </td>
                      <td><a class="color9393B1">撤销</a></td>
                    </tr>

                  </table>
                </div>
                <!--成交记录-->
                <div class="assets_content" v-if="assetsTabs[2].state">
                  <div class="content1-title">
                    <span class="title">{{currentMarket.ywm_s}}/{{currentMarket.ywm_m}}</span>
                    <span class="screen" @click="getUserRecord(0)">全部</span>
                    <span class="screen" @click="getUserRecord(1)">买入</span>
                    <span class="screen" @click="getUserRecord(2)">卖出</span>
                  </div>

                  <table class="assets_table">
                    <tr class="title">
                      <th width="105" class="paddingLeft20">成交时间</th>
                      <th width="130">单价</th>
                      <th width="130">委托数量</th>
                      <th width="145">成交金额</th>
                      <th>手续费</th>
                    </tr>

                    <tr v-for="item in userRecord">
                      <td>
                        <p>
                          <span :style="{backgroundColor:item.type === '1' ? '#A33856' : '#24A983'}"
                                class="entrust_state_text">
                            {{item.type === '1' ? '买' : '卖'}}
                          </span>
                          {{item.dates}}
                        </p>
                      </td>
                      <td>{{item.cjPic}}</td>
                      <td>{{item.cjNumber}}</td>
                      <td>{{item.cjMoney}}</td>
                      <td>
                        {{item.type === '1' ? item.cost.toFixed(item.ws) : item.cost.toFixed(4)}}{{item.type === '1' ? currentMarket.ywm_s : currentMarket.ywm_m}}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--买卖单列表-->
        <div class="right bbm_fl">
          <div class="record_title">
            <span>买/卖</span>
            <span>价格</span>
            <span>数量</span>
          </div>

          <div :style="{height:sellEntrustBoxH}">
            <entrust-table ref="sellEntrust" :entrustInfo="pageInfo.sell" :type="'fall'"
                           @getCurrentPrice="setBuySellPrice" v-if="pageInfo.sell.length">
            </entrust-table>
          </div>

          <div class="record_title buy_title">
            <p>
              <span class="rise" @click="setBuySellPrice(currentMarket.dqj)">
                {{currentMarket.dqj}}
              </span>
              ≈ ￥{{currentMarket.dqj_cny}}
            </p>
          </div>
          <entrust-table ref="buyEntrust" :entrustInfo="pageInfo.buy" :type="'rise'"
                         @getCurrentPrice="setBuySellPrice" v-if="pageInfo.buy.length"></entrust-table>
        </div>
      </div>

      <div class="transaction_about">
        <div class="about_list scrollbar">
          <div class="about_item">
            <p class="item_title">关于BBM</p>
            <div class="item_content">
              BBM币是社区运转的代币，也是天使投资者从项目盈利中获得回报的一种形式，盈利模式非常清晰。为了维持社区BBM的收支平横，维护投资者的权益，币家将会用部分盈利在二级市场回收BBM，以保障BBM流通的动态平衡。BBM币-币家一体化平台的中心代币主要应用于币家四大板块核心功能的实现及运营发展。
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trans_img"></div>
  </div>
</template>

<style src="../assets/css/transaction.css">
</style>

<script>
  import entrustTable from '../components/transaction/entrust-table';
  import entrustForm from '../components/transaction/entrust-form';
  import {get_api} from '../api/api'

  import {marketMixin} from '../utils/marketMixin';
  import * as transactionServer from '../api/transaction'

  export default {
    mixins: [marketMixin],
    data () {
      return {
        scId: '', //当前市场id
        kLineSrc: '',
        pageInfo: {sell: [], buy: [], record: []}, //页面数据
        marketSwitchState: false, //是否可以切换市场
        sellEntrustBoxH: null,//卖单委托div高度
        recordList: [], //当前市场所有交易记录
        currentTab: 1, //资产区域Tab
        assetsTabs: [],//资产Tab标题及切换状态
        buySellInput: {}, //买卖input信息
        availableAssets: {buy: {}, sell: {}}, //可用资产
        buttonInfo: {},
        userEntrust: [],
        userRecord: []
      }
    },

    methods: {
      //获取页面信息
      getPageInfo(){
        let self = this;
        let params = {scid: this.scId};
        let getBuySellForm = 0;
        let buyPrice = '';
        let sellPrice = '';
        //交易记录信息
        transactionServer.getRecordByScId(params, function (data) {
          self.pageInfo.record = data.msg;
        });
        //获取卖单委托
        transactionServer.getSellEntrust(params, function (data) {
          if (data.msg.length) {
            self.pageInfo.sell = data.msg.reverse();
            self.sellEntrustBoxH = (data.msg.length * 23) + 'px'; //设置卖单div高度
            getBuySellForm++;
            buyPrice = data.msg[data.msg.length - 1].jg;
            if (getBuySellForm === 2) {
              self.buySellInput.buyInput = transactionServer.getBuySellForm(buyPrice, sellPrice).buyForm; //设置买单默认价
              self.buySellInput.sellInput = transactionServer.getBuySellForm(buyPrice, sellPrice).sellForm; //设置买单默认价
            }
          }
        });
        //获取买单委托
        transactionServer.getBuyEntrust(params, function (data) {
          if (data.msg.length) {
            self.pageInfo.buy = data.msg;
            getBuySellForm++;
            sellPrice = data.msg[0].jg;
            if (getBuySellForm === 2) {
              self.buySellInput.buyInput = transactionServer.getBuySellForm(buyPrice, sellPrice).buyForm; //设置买单默认价
              self.buySellInput.sellInput = transactionServer.getBuySellForm(buyPrice, sellPrice).sellForm; //设置买单默认价
            }
          }
        })
      },

      //获取我的资产
      getBalances(){
        let sendData = {
          bjc: null,
          start: 0,
          offset: 99
        };
        transactionServer.getBalances(sendData, function (data) {
          console.log(data);
        })
      },

      //买卖input单价赋值
      setBuySellPrice(price){
        this.$refs.buyForm.setBuySellPrice(price);
        this.$refs.sellForm.setBuySellPrice(price)
      },

      //顶部资产tab切换
      assetsTabSwitch(tabId){
        //未登录不能切换
        if (!this.$store.state.loginState) {
          return
        }
        this.currentTab = tabId;
        for (let val of this.assetsTabs) {
          val.state = val.id === tabId ? true : false;
        }
        if (this.currentTab === 2) {
          this.getUserEntrust(0);
          return
        }
        if (this.currentTab === 3) {
          this.getUserRecord(0)
        }

      },

      //买卖委托单及交易记录动画执行
      pageFadeIn(){
        let self = this;
        setTimeout(function () {
          if (self.$refs.sellEntrust && self.$refs.buyEntrust) {
            self.$refs.sellEntrust.entrustFadeIn();
            self.$refs.buyEntrust.entrustFadeIn();
          }
          self.marketSwitchState = true;
          self.$utils.fadeIn(self.pageInfo.record, self.recordList, 50).then(function () {
            self.marketSwitchState = false;
          });
        }, 10);
      },

      //市场行情切换
      marketSwitch(scid){
        //页面动画执行完后才能初始化
        if (this.marketSwitchState) {
          return
        }
        //路由跳转
        this.$router.push('/transaction/' + scid);
        //数据初始化
        this.recordList = [];
        this.pageInfo = {sell: [], buy: [], record: []};
        this.mixinInit();
        this.init();
      },

      //获取用户委托信息
      getUserEntrust(type){
        let sendData = {
          type: type,
          scid: this.scId,
        };
        let self = this;
        transactionServer.getUserEntrust(sendData, function (data) {
          self.userEntrust = data.item;
          self.userEntrust.currentTab = type;
        })
      },

      //获取用户交易记录
      getUserRecord(type){
        let sendData = {
          type: type,
          scid: this.scId,
          start: 0,
          offset: 99
        };
        let self = this;
        transactionServer.getRecordByUser(sendData, function (data) {
          self.userRecord = data.items;
          self.userRecord.currentTab = type;
        })
      },

      buySellParams(type){
        if (type === 'buy') {
          return {
            scid: this.scId,
            price: this.buySellInput.buyInput[0].info.value,
            num: this.buySellInput.buyInput[1].info.value,
            jymm: this.buySellInput.buyInput[2] ? this.buySellInput.buyInput[2].info.value : ''
          }
        } else {
          return {
            scid: this.scId,
            price: this.buySellInput.sellInput[0].info.value,
            num: this.buySellInput.sellInput[1].info.value,
            jymm: this.buySellInput.sellInput[2] ? this.buySellInput.sellInput[2].info.value : ''
          }
        }
      },
      //页面初始化
      init(){
        this.scId = this.$route.params.scid ? this.$route.params.scid : 1;
        this.getPageInfo(); //交易记录
        this.kLineSrc = 'http://192.168.1.7:9812/cn/trading/kline_.html?scid=' + this.scId + '&hqlbid=' + this.$store.state.partInfo[0];
      }
    },

    created(){
      this.assetsTabs = transactionServer.getAssetsTabs(this.$store.state.loginState);
      this.buttonInfo = transactionServer.getButtonInfo(this.buySellParams);
    },

    mounted(){
      this.init();
      this.getBalances();
    },
    watch: {
      //确保数据请求到以后再加载动画效果
      pageInfo: {
        handler: function (val) {
          if (this.marketSize !== null && val.sell.length > 0 && val.buy.length > 0 && val.record.length > 0) {
            this.pageFadeIn()
          }
        },
        deep: true
      },

      //市场行情改变委托买卖单也改变
      marketSize: function (val, oldVal) {
        if (oldVal === null) {
          this.pageFadeIn()
        }
      },

      //监听市场改变从而改变资产信息
      currentMarket: function (val) {
        let self = this;
        transactionServer.getAssetsByScId({scid: this.scId}, val.ws, function (data) {
          self.availableAssets.buy = {id: 1, num: data.buy_bz_ky, currencyName: self.currentMarket.ywm_m,};
          self.availableAssets.sell = {id: 2, num: data.sell_bz_ky, currencyName: self.currentMarket.ywm_s,};
          self.availableAssets.buy.ws = self.availableAssets.sell.ws = self.currentMarket.ws;
          self.availableAssets.buy.ywm_m = self.availableAssets.sell.ywm_m = self.currentMarket.ywm_m;
        })
      },
    },
    components: {entrustTable, entrustForm}
  }
</script>
