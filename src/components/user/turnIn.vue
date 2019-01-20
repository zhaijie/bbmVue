<template>

  <div class="user_details turnIn_details">

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

    <div class="wallet_info clearfix">
      <div class="wallet_address bbm_fl">
        这是您的钱包地址，请将您的 <b class="remind">{{currentName}}</b> 转入此地址：
        <p class="remind">确保转入币种与接收地址信息一致，否则资产将不可找回！）</p>


        <p class="address">{{currentAddress}}</p>

      </div>

      <div class="wallet_code bbm_fr">
        <img src="../../assets/images/ewm.jpg" width="90">
        <p>{{currentName}}钱包地址</p>
      </div>
    </div>

    <div class="turnIn_explain">
      <span>转入说明</span>
      <ul>
        <li>1. 转入是自动的， 比特币 转账需要整个 比特币 网络进行确认。</li>
        <li>2. 此地址是您唯一且独自使用的转入地址，您可以同时进行多次充值。</li>
        <li>3. 区块网络会有延时，若长时间未到账，请联系客服：service@bjex.vip处理。</li>
      </ul>
    </div>

    <table cellspacing="0" class="user_table">
      <thead>
      <tr>
        <th width="165">转入时间</th>
        <th width="90">转入币种</th>
        <th width="260">转出地址</th>
        <th width="150">转入数量</th>
        <th width="150">到账数量</th>
        <th width="80">状态</th>
      </tr>
      </thead>
      <tbody>
      <!--<tr>-->
        <!--<td>2018-04-18 11:25:30</td>-->
        <!--<td>比特币</td>-->
        <!--<td>asdfasdfasdfasdfasdfasdf</td>-->
        <!--<td>1000000.0000</td>-->
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
        currentAddress: ''
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

