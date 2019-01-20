<template>

  <div class="user_details">
    <table cellspacing="0" class="user_table">
      <thead>
      <tr>
        <th width="165" class="paddingLeft20">
          <m-select :selectList="selectList" v-if="selectList"></m-select>
        </th>
        <th width="136">钱包标签</th>
        <th width="320">钱包地址</th>
        <th width="224">添加时间</th>
        <th width="70">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="paddingLeft20">{{addressInfo.name}}</td>
        <td>{{addressInfo.bq}}</td>
        <td>{{addressInfo.item}}</td>
        <td>{{addressInfo.time}}</td>
        <td><a @click="deleteWallet()">删除</a></td>
      </tr>
      </tbody>
    </table>

    <button class="btn bbm_fr add_btn" @click="alertWallet()">添加一个地址</button>
    <user-alert ref="userAlert" :formData="addWalletForm" :alertInfo="alertInfo"></user-alert>
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
  import {mapActions} from 'vuex'
  import {getWalletForm, getAddress} from '../../api/user';
  import UserAlert from './user-alert';
  import MSelect from '../../components/public/m-select';
  import ConfirmAlert from '../../components/public/message/message';

  export default {
    data () {
      return {
        alertInfo: {title: '添加一个钱包地址', buttonText: '立即添加', state: false},
        addWalletForm: [],
        selectList: null,
        confirmAlertInfo: {},
        addressInfo: []
      }
    },
    methods: {
      ...mapActions({getBbcList: 'GET_BBC_LIST'}),

      //删除钱包地址
      deleteWallet(){
        this.confirmAlertInfo = {
          content: '是否删除该钱包地址',
          button: [
            {
              text: '确定',
              addClass: ['ok_btn'],
              handle: function () {
              }
            },
            {text: '取消', addClass: ['bbm_fr']},
          ]
        };
        ConfirmAlert.create(this.confirmAlertInfo, true)
      },

      //显示添加钱包弹框
      alertWallet(){
        this.$refs.userAlert.show();
      },

      //获取钱包地址
      getWalletAddress(item){
        let self = this;
        self.addressInfo.name = item.enName;
        self.addressInfo.item = '';
        getAddress(item.bid, function (data) {
          data.name = item.enName;
          if (data) {
            self.addressInfo = data;
          }
        })
      }
    },
    mounted(){
      let self = this;
      this.getBbcList(function (data) {
        self.addWalletForm = getWalletForm(self.getWalletAddress, data.item);
        self.getWalletAddress(data.item[0]);
        self.selectList = {
          handle: self.getWalletAddress,
          data: data.item
        };
      });
    },
    created(){
    },
    components: {UserAlert, MSelect}
  }
</script>

