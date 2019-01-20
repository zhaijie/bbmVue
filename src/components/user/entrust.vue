<template>

  <div class="user_details">
    <table cellspacing="0" class="user_table">
      <thead>
      <tr>
        <th width="180">
          <m-select :selectList="currencyList" v-if="currencyList"></m-select>
        </th>
        <th width="160">成交记录</th>
        <th width="100">类型</th>
        <th width="120">委托价格</th>
        <th width="120">委托数量</th>
        <th width="130">已成交量</th>
        <th width="70">状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in entrustData">
        <td>{{currentName}}</td>
        <td>{{item.date}}</td>
        <td :class="item.type === 'MC'?'fall':'rise'">{{item.type === 'MC' ? '卖出' : '买入'}}</td>
        <td>{{item.wtPic}}</td>
        <td>{{item.wtNumber}}</td>
        <td>{{item.cjNumber}}</td>
        <td>{{item.wtNumber === item.cjNumber ? '已完成' : '交易中'}}</td>
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
  import {entrustRecord} from '../../api/user';

  export default {
    data () {
      return {
        currencyList: null,
        entrustData: [],
        currentName: '',
      }
    },
    methods: {
      ...mapActions({getBbcList: 'GET_BBC_LIST'}),

      entrustRecord(item){
        let sendData = {type: 0, scid: item.bid};
        let self = this;
        self.currentName = item.enName;
        entrustRecord(sendData, function (data) {
          self.entrustData = data.item;
        })

      }
    },
    mounted(){
      let self = this;
      this.getBbcList(function (data) {
        self.entrustRecord(data.item[0]);
        self.currencyList = {
          handle: self.entrustRecord,
          data: data.item
        };
      });
    },
    components: {MSelect}
  }
</script>

