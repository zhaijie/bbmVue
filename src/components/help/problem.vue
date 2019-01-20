<template>

  <div class="user_details">
    <h1 class="problem_title">平台相关</h1>

    <div class="problem_list clearfix">
      <div class="problem_item bbm_fl" v-for="item in problemList">
        <p>{{item.title}}
          <router-link :to="'/help/list/'+item.id" class="bbm_fr">更多 > </router-link>
        </p>
        <ul>
          <li v-for="item1 in item.list">
            <router-link :to="'/help/details/'+item.id">{{item1.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <h1 class="problem_title margin_top48">意见反馈</h1>
    <div class="suggestion">
      <textarea class="suggestion_textarea" placeholder="请填写您的宝贵意见！" v-model="suggestionInfo.content"></textarea>
      <span class="suggestion_length"> 0/ 150</span>
    </div>

    <div class="suggestion_contact">
      <input type="text" placeholder="请留下您的手机或QQ" v-model="suggestionInfo.contact">
      <button @click="submitSuggestion()">提交</button>
      <span>*</span>
    </div>
  </div>

</template>
<style>
  @import "../../assets/css/help.css";
</style>
<script>

  import {problemList, suggestion} from '../../api/problem'
  import ConfirmAlert from '../../components/public/message/message';

  export default {
    data () {
      return {
        problemList: [],
        suggestionInfo: {
          content: '',
          contact: ''
        }
      }
    },

    methods: {
      submitSuggestion(){
        console.log(this.suggestionInfo);
        if (this.suggestionInfo.content === '' || this.suggestionInfo.contact === '') {
          ConfirmAlert.create({
            content: '请填写反馈内容与联系方式',
            button: [
              {
                text: '确定',
                addClass: ['confirm_btn']
              },
            ]
          }, true);
          return
        }

        let self = this;
        suggestion(this.suggestionInfo, function (data, mes) {
          ConfirmAlert.create({
            content: mes,
            button: [
              {
                text: '确定',
                addClass: ['confirm_btn'],
                handle: function () {
                  if (data) {
                    self.suggestionInfo = {};
                  } else {
                    self.$router.push('/form/0');
                  }
                }
              },
            ]
          }, true);
        })
      }
    },

    mounted(){
      this.problemList = problemList();
    },
    components: {}
  }
</script>

