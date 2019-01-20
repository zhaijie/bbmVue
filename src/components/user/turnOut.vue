<template>

  <div class="user_details turnOut_details">
    <div class="currency_select clearfix">
      <div class="select_box bbm_fl">
        <span class="title">币种名称</span>
        <m-select :selectList="currencyList" v-if="currencyList"></m-select>
      </div>

      <div class="balance_box bbm_fl">
        <span class="title">可用余额</span>
        <div class="select_list">0.00</div>
      </div>

      <button class="bbm_fr btn">同步资产</button>
    </div>

    <div class="turnOut_info clearfix">

      <div class="turnOut_form bbm_fl">
        <div class="turnOut_input">
          <label>转出地址</label>
          <input type="text" v-model="currentAddress" readonly>
        </div>
        <div class="turnOut_input">
          <label>转出数量</label>
          <input type="text">
        </div>
        <div class="turnOut_input">
          <label>验证码</label>
          <input type="text">
        </div>
        <div class="turnOut_input">
          <label>交易密码</label>
          <input type="text">
        </div>

        <button class="btn">提交</button>

      </div>

      <div class="bbm_fl turnOut_remind">
        <span class="remind">温馨提示</span>
        <ul>
          <li>1、 单笔转出最低0.00BTC，最高10.00BTC。</li>
          <li>2、 转出手续为转出数量的50.0000%，最小转账手续费为 <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.0BTC。</li>
          <li>3、 正常情况下1个工作日到账，最多不超过3个工作日，节假<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日顺延。</li>
          <li>4、 若未到账，请联系客服：service@bjex.vip处理。</li>
        </ul>
      </div>
    </div>

    <table cellspacing="0" class="user_table">
      <thead>
      <tr>
        <th width="130">转出时间</th>
        <th width="95">转出币种</th>
        <th width="240">接收地址</th>
        <th width="125">转出数量</th>
        <th width="125">转出费用</th>
        <th width="125">实际到账</th>
        <th>是否转出</th>
      </tr>
      </thead>
      <tbody>
      <!--<tr>-->
      <!--<td>2018-04-18 11:25:30</td>-->
      <!--<td>比特币</td>-->
      <!--<td>asdfasdfasdfasdfasdfasdf</td>-->
      <!--<td>1000000.0000</td>-->
      <!--<td>1100000.0000</td>-->
      <!--<td>1100000.0000</td>-->
      <!--<td>交易完成</td>-->
      <!--</tr>-->
      </tbody>
    </table>

  </div>
</template>

<script>
  import MSelect from '../../components/public/m-select.vue'
  import {mapActions} from 'vuex'
  import {getAddress} from '../../api/user';

  export default {
    data () {
      return {
        currencyList: null,
        currentName: '',
        currentAddress: '',
      }
    },
    methods: {
      ...mapActions({getBbcList: 'GET_BBC_LIST'}),

      getPageData(item){
        this.currentName = item.enName;
        let self = this;
        getAddress(item.bid, function (data) {
          if (data) {
            self.currentAddress = data.item;

          } else {
            self.currentAddress = '';
          }
        })
      }
    },
    mounted(){
      let self = this;
      this.getBbcList(function (data) {
        self.getPageData(data.item[0]);
        self.currencyList = {
          handle: self.getPageData,
          data: data.item
        };
      });
    },
    components: {MSelect}
  }
</script>

