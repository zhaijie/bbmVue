<template>

  <div class="user_details">

    <table cellspacing="0" class="user_table">
      <thead>
      <tr>
        <th width="180">开户银行</th>
        <th width="136">开户支行</th>
        <th width="320">银行卡号</th>
        <th width="224">添加时间</th>
        <th width="70">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in bankCardList.item" v-if="bankCardList.status">
        <td>{{item.bankName}}</td>
        <td>{{item.khzh}}</td>
        <td>{{item.bankCard}}</td>
        <td>{{item.date}}</td>
        <td><a @click="deleteBankCard(item.id)">删除</a></td>
      </tr>
      </tbody>
    </table>
    <button class="btn bbm_fr add_btn" @click="alertBank()">添加银行卡</button>
    <user-alert ref="userAlert" :formData="addCardForm" :alertInfo="alertInfo"></user-alert>

  </div>
</template>

<script>

  import {getAddCardForm, getBankCard, getBanks, delBank} from '../../api/user';
  import UserAlert from './user-alert';
  import ConfirmAlert from '../../components/public/message/message';

  export default {
    data () {
      return {
        alertInfo: {title: '添加一个银行地址', buttonText: '立即添加', state: false},
        addCardForm: [],
        confirmAlertInfo: {},
        bankCardList: [],
      }
    },
    methods: {
      //删除银行卡
      deleteBankCard(id){
        let self = this;
        this.confirmAlertInfo = {
          content: '是否删除该银行卡',
          button: [
            {
              text: '确定', addClass: ['ok_btn'], handle: function () {
              delBank({bankNumber: id}, function (data) {
                if (data) {
                  self.bankCardList.item.forEach(function (val, i) {
                    if (val.id === id) {
                      self.bankCardList.item.splice(i, i + 1)
                    }
                  });
                }
              })
            }
            },
            {text: '取消', addClass: ['bbm_fr']},
          ]
        };
        ConfirmAlert.create(this.confirmAlertInfo, true)
      },

      //显示添加钱包弹框
      alertBank(){
        this.$refs.userAlert.show();
      },

    },
    mounted(){
      let self = this;
      getBankCard(function (data) {
        self.bankCardList = data
      });
      getBanks(function (data) {
        self.addCardForm = getAddCardForm(false, data.list);
      })
    },
    components: {UserAlert}
  }
</script>

