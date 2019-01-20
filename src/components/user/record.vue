<template>

  <div class="user_details">
    <table cellspacing="0" class="user_table">
      <thead>
      <tr>
        <th width="180">
          <m-select :selectList="currencyList" v-if="currencyList"></m-select>
        </th>
        <th width="160">成交时间</th>
        <th width="100">类型</th>
        <th width="120">成交价格</th>
        <th width="120">成交数量</th>
        <th width="130">总金额</th>
        <th width="70">手续费</th>
      </tr>
      </thead>
      <tbody>
      <!--cjid	Number	成交记录id	父集：items-->
      <!--date	String	成交时间	父集：items-->
      <!--cjPic	Number	成交单价	父集：items-->
      <!--cjNumber	Number	成交数量	父集：items-->
      <!--cjMoney	Number	成交金额	父集：items-->
      <!--cost	Number	手续费	父集：items-->
      <!--type	String	交易类型	1.委托买入，2.委托卖出-->
      <!--ws	String	小数位数	父集：items-->
      <tr v-for="item in tradingData">
        <td>{{currentName}}</td>
        <td>{{item.date}}</td>
        <td :class="item.type === 'MC'?'fall':'rise'">{{item.type === 'MC' ? '卖出' : '买入'}}</td>
        <td>{{item.wtPic}}</td>
        <td>{{item.wtNumber}}</td>
        <td>{{item.wtNumber * item.wtPic}}</td>
        <td>{{item.cost}}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>
<style>
  .user_table .my_select {
    height: 28px;
    line-height: 28px;
    width: 120px;
  }
</style>
<script>
  import MSelect from '../../components/public/m-select.vue'
  import {mapActions} from 'vuex'
  import {entrustRecord} from '../../api/user'
  export default {
    data () {
      return {
        currencyList: null,
        tradingData: [],
        currentName: '',
      }
    },
    methods: {
      ...mapActions({getBbcList: 'GET_BBC_LIST'}),

      getTradingRecord(item){
        let sendData = {type: 0, scid: item.bid};
        let self = this;
        self.currentName = item.enName;
        entrustRecord(sendData, function (data) {
          self.tradingData = data.item;
        })
      }
    },
    mounted(){
      let self = this;
      this.getBbcList(function (data) {
        self.getTradingRecord(data.item[0]);
        self.currencyList = {
          handle: self.getTradingRecord,
          data: data.item
        };
      });
    },
    components: {MSelect}
  }
</script>

