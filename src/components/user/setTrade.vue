<template>

  <div class="user_details">

    <ul class="set_trade">
      <li>
        <label>
          <input type="radio" value="MCJY" name="setTrade">
          每笔交易都不输入交易密码
        </label>
      </li>
      <li>
        <label>
          <input checked="checked" type="radio" value="MBJY" name="setTrade">
          每笔交易都输入交易密码
        </label>
      </li>

      <li>
        <input type="password" class="set_trade_input" placeholder="请输入交易密码">
      </li>

      <li>
        <button class="btn">保存</button>
      </li>
    </ul>

  </div>

</template>

<script>
  export default {
    data () {
      return {
        type: ''
      }
    },
    mounted(){
      this.type = this.$route.params.type;
    }
  }
</script>

