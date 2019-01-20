<template>

  <div class="user_details">
    <div class="c2c_tabs clearfix">
      <a v-for="item in c2cTab" :class="{'active':currentTab === item.id}" @click="tabsSwitch(item)">
        {{item.text}}
      </a>
      <span></span>
    </div>

    <table class="user_table" cellspacing="0" v-if="currentTab !==3">
      <thead>
      <tr>
        <th width="240"><span>商户</span></th>
        <th width="240">数量（CNT）</th>
        <th width="240">限额</th>
        <th width="117">单价</th>
        <th width="74">操作</th>
      </tr>
      </thead>
    </table>

    <div class="c2c_content">
      <div class="c2c_table_item" v-for="item in merchantOrderList" v-if="currentTab !==3">
        <div class="c2c_info clearfix">
          <p class="width238">({{item.merchantName}}){{item.merchantAccount}}</p>
          <p class="width238">100,00,000.0000</p>
          <p class="width238">1000000000.00-5000000000.00</p>
          <p class="c2c_price rise">￥{{item.price}}</p>
          <p class="c2c_btn"><span class="btn" @click="$refs.userAlert.show()">购买CNT</span></p>
        </div>
        <p class="c2c_message">{{item.merchantMessage}}</p>
      </div>

      <div class="c2c_order" v-if="currentTab ===3">
        <table class="c2c_table user_table" cellspacing="0">
          <thead>
          <tr>
            <th width="95"><span>单号</span></th>
            <th width="95">时间</th>
            <th width="85">BTC</th>
            <th width="150">数量</th>
            <th width="95">单价(CNT)</th>
            <th width="150">总价(CNT)</th>
            <th width="80">全部</th>
            <th width="70">状态</th>
            <th>操作</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>000000001</td>
            <td><span class="table_time">2018-04-19 11:43:54</span></td>
            <td>CNT</td>
            <td>100000000000.0000</td>
            <td>12.0245</td>
            <td>2250000000.0000</td>
            <td class="rise">购买</td>
            <td>待付款</td>
            <td>
              <router-link to="/user/c2cOrderDetails" class="look_order">查看</router-link>
            </td>
          </tr>

          <tr>
            <td>000000001</td>
            <td><span class="table_time">2018-04-19 11:43:54</span></td>
            <td>CNT</td>
            <td>100000000000.0000</td>
            <td>12.0245</td>
            <td>2250000000.0000</td>
            <td class="fall">出售</td>
            <td>待付款</td>
            <td>
              <router-link to="/user/c2cOrderDetails" class="look_order">查看</router-link>
            </td>
          </tr>

          <tr>
            <td>000000001</td>
            <td><span class="table_time">2018-04-19 11:43:54</span></td>
            <td>CNT</td>
            <td>100000000000.0000</td>
            <td>12.0245</td>
            <td>2250000000.0000</td>
            <td class="rise">出售</td>
            <td>待付款</td>
            <td>
              <router-link to="/user/c2cOrderDetails" class="look_order">查看</router-link>
              <a class="c2c_revoke" @click="$refs.confirmAlert.show()">撤销</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <user-alert ref="userAlert" :formData="buyForm" :alertInfo="alertInfo">
      <span class="cnt_span" slot="cnt">(CNT)</span>
      <p class="c2c_cnt_count" slot="cntCount">需要<span class="rise bold">100.00-50000.00</span>CNY;需要
        <span class="rise bold">100</span>CNY</p>
    </user-alert>

    <confirm-alert ref="confirmAlert" @okConfirm="revokeOrder()" :confirmInfo="confirmAlertInfo"></confirm-alert>


  </div>

</template>

<script>

  import {getC2CForm} from '../../api/user';
  import UserAlert from './user-alert';
  import {merchantOrderList} from '../../api/user';
  import ConfirmAlert from '../../components/public/confirm-alert.vue';

  export default {
    data () {
      return {
        c2cTab: [{id: 1, text: '购买CNT'}, {id: 2, text: '出售CNT'}, {id: 3, text: '我的订单'}],
        currentTab: 1,
        alertInfo: {title: '购买CNT', buttonText: '立即买入', state: false},
        buyForm: getC2CForm(), //购买CNT表单信息
        merchantOrderList: [],
        confirmAlertInfo: {
          content: '请确定该笔订单尚未进行汇款是否撤销该笔订单',
          title: '撤销订单',
          addClass: 'revoke_order',
          button: [
            {text: '确定', addClass: ['ok_btn']},
            {text: '取消', addClass: ['bbm_fr']},
          ]
        }
      }
    },
    methods: {
      //c2c交易tab切换
      tabsSwitch(item){
        this.currentTab = item.id;
        this.getMerchantOrderList(item.id)
      },

      //获取商户订单列表
      getMerchantOrderList(type){
        if (type === 3) {
          return
        }

        let sendData = {type: type, start: 0, offset: 10};
        let self = this;
        merchantOrderList(sendData, function (data) {
          if (data.item) {
            self.merchantOrderList = data.item
          }
        })
      },

      // 确定撤销订单
      revokeOrder(){
        this.$refs.confirmAlert.close();
      }
    },

    mounted(){
      this.getMerchantOrderList(1)
    },

    components: {UserAlert, ConfirmAlert}
  }
</script>

