<template>

  <div class="user_details">

    <div class="assets_info clearfix">

      <div class="currency_info bbm_fl">
        <img src="../../assets/images/CNT.png" width="72" height="72">
        <p>CNT</p>
      </div>

      <div class="assets_number bbm_fl">
        <div>
          <p>总资产</p>
          <span>0.0000</span>
        </div>
        <div>
          <p>可用</p>
          <span class="usable">0.0000</span>
        </div>
        <div>
          <p>冻结</p>
          <span>0.0000</span>
        </div>
      </div>

      <p class="currency_hide bbm_fr">隐藏小额币种
        <img @click="currencyHideShow()"
             :src="currencyHide?require('../../assets/images/icon_open.png'):require('../../assets/images/icon_close.png')">
      </p>
    </div>

    <table class="user_table">
      <thead>
      <tr>
        <th width="102">币种</th>
        <th width="180">可用币数</th>
        <th width="180">冻结委托</th>
        <th width="180">总计</th>
        <th width="180">折合（CNY）</th>
        <th width="">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <img src="../../assets/images/CNT.png" width="24" height="24">
          <span class="assets_currency">CNT</span>
        </td>
        <td>0.0000</td>
        <td>0.0000</td>
        <td>0.0000</td>
        <td>0.0000</td>
        <td><a href="#">去交易</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currencyHide: true
      }
    },
    methods: {
      currencyHideShow(){
        this.currencyHide = !this.currencyHide

      }
    }
  }
</script>

