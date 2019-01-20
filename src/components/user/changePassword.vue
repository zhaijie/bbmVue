<template>

  <div class="user_details">
    <div class="google_form">

      <ul class="input_list password_input_list">
        <li>
          <label>{{$route.params.type === '1' ? '登录' : '交易'}}密码:</label>
          <input type="text">
        </li>

        <li>
          <label>新{{$route.params.type === '1' ? '登录' : '交易'}}密码:</label>
          <input type="text">
        </li>

        <li>
          <label>再次输入新密码:</label>
          <input type="text">
        </li>
      </ul>

      <button class="btn submit_btn">保存</button>

      <p v-if="$route.params.type === '2'" class="color4786EF text-center">为保障您的资金安全，请设置交易密码，请务必牢记</p>

    </div>

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

