<template>

  <div class="user_details">

    <div class="user_safe clearfix">
      <span class="bbm_fl">安全等级</span>
      <p class="bbm_fl">
        <span :style="{width:userInfo.safetyGrade+'%'}"></span>
      </p>
      <span class="grade">{{userInfo.gradeText}}</span>
    </div>

    <ul class="user_info clearfix">
      <li><span>ID:</span>{{userInfo.ID}}</li>
      <li><span>账号:</span>{{userInfo.username}}</li>
      <li><span>姓名:</span>{{userInfo.uname}}</li>
      <li><span>证件号:</span>{{userInfo.zjh}}</li>
      <li><span>邀请码:</span>{{userInfo.yqm}}</li>
      <li><span>邀请链接:</span><input type="text" value="www.asdfasdfasdfasdfasdfasdfasdf" id="copyObj" readonly>
        <button class="btn info_btn bbm_fr" @click="CopyUrl">复制</button>
      </li>
    </ul>

    <div class="safe_info">
      <ul class="safe_list">
        <li>
          <img src="../../assets/images/icon_yes.png">
          <span class="title">登录密码</span>
          <span class="dec">登录账户时需要输入的密码</span>
          <button class="btn info_btn bbm_fr">修改</button>
        </li>
        <li>
          <img
            :src="userInfo.jypwd==1?require('../../assets/images/icon_yes.png'):require('../../assets/images/icon_no.png')">
          <span class="title">交易密码</span>
          <span class="dec">在进行交易时需要输入的密码</span>
          <button class="btn info_btn bbm_fr">修改</button>
        </li>
        <li>
          <img
            :src="userInfo.uname?require('../../assets/images/icon_yes.png'):require('../../assets/images/icon_no.png')">
          <span class="title">实名认证</span>
          <span class="dec">受国家要求及为了您的资金安全需进行实名认证</span>
          <button class="btn info_btn bbm_fr">查看</button>
        </li>
        <li>
          <img src="../../assets/images/icon_yes.png">
          <span class="title">绑定账号</span>
          <span class="dec">{{userInfo.username}}</span>
          <span class="bbm_fr">已绑定</span>
        </li>
        <li>
          <img
            :src="userInfo.google==1?require('../../assets/images/icon_yes.png'):require('../../assets/images/icon_no.png')">
          <span class="title">谷歌认证</span>
          <span class="dec">谷歌身份验证器</span>
          <button class="btn info_btn bbm_fr">认证</button>
        </li>
      </ul>
    </div>

  </div>

</template>

<style>
  @import "../../assets/css/user/info.css";
</style>

<script>

  import {getUserAll} from '../../api/user'
  export default {
    data () {
      return {
        userInfo: {}
      }
    },
    methods: {
      //复制邀请链接
      CopyUrl(){
        let url = document.querySelector('#copyObj');
        url.select(); // 选择对象
        document.execCommand("Copy");
      },
      //获取用户信息
      getUserInfo(){
        let self = this;
        getUserAll(function (data) {
          self.userInfo = data;
        });
      }
    },
    mounted(){
      this.getUserInfo()
    }
  }
</script>

