/**
 * Created by Administrator on 2018/7/2 0002.
 */

import {mapActions} from 'vuex'
import {getMarket} from'../api/market';

export const marketMixin = {
  data() {
    return {
      partInfo: {},
      marketSize: null,
      marketInfo: [], //市场行情数据
      currentMarket: {},
      animationState: {
        fadeShow: true, //涨跌幅动画状态
        marketState: false //市场行情动画状态
      },
      getMarketListState: false,
      currentPart: '', //记录用户选择的分区，以防刷新丢失
    }
  },

  methods: {
    ...mapActions({getPart: 'GET_PART_INFO'}),

    //切换分区
    partTabs: function (fqId) {
      if (this.getMarketListState) {
        return
      }

      //市场数据初始化
      this.marketInfo = [];
      window.sessionStorage.setItem('fqId', fqId);
      this.currentPart = fqId;
      this.animationState.marketState = false;
      this.getMarketList(fqId)
    },

    //市场行情列表
    getMarketList(){
      let self = this;
      self.getMarketListState = true;
      getMarket(self.currentPart, function (data) {
        //获取当前行情信息
        let scId = self.$route.params.scid;
        self.marketSize = data.msg.length;
        if (self.$route.params.scid !== undefined) {
          self.getMarketByScId(scId, data.msg)
        }
        self.marketInfo = []; //初始化行情信息
        if (self.animationState.marketState) {
          self.marketInfo = data.msg;
          // self.marketSize = data.msg.length;
          self.getMarketListState = false;
          return;
        }

        if (data.msg.length) {
          self.animationState.marketState = true;
          //执行行情动画线程
          self.$utils.fadeIn(data.msg, self.marketInfo).then(function () {
            // self.marketSize = data.msg.length;
            self.getMarketListState = false
          });
        } else {
          self.marketInfo = [];
        }
      })
    },

    //获取当前市场信息
    getMarketByScId(scid, sourceArr){
      for (let item of sourceArr) {
        if (item.scid + '' === scid) {
          this.currentMarket = item;
        }
      }
    },

    mixinInit(){
      //数据初始化
      this.animationState = {
        fadeShow: true, //涨跌幅动画状态
        marketState: true //市场行情动画状态
      };
      this.getMarketListState = false;
      this.getMarketList(this.currentPart)
    }
  },
  mounted (){
    let self = this;
    let fqId = window.sessionStorage.getItem('fqId');
    if (self.$store.state.partInfo.length) {
      self.partInfo = self.$store.state.partInfo;
      self.currentPart = fqId;
      self.getMarketList(self.currentPart);
      return;
    }
    //获取所有分区
    this.getPart().then(function () {
      self.partInfo = self.$store.state.partInfo;
      self.currentPart = fqId ? fqId : self.partInfo[0].partId;
      //初始化市场信息
      self.getMarketList(self.currentPart)
    });
  },

};
