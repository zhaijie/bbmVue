<template>

  <div class="notice_detail scrollbar">
    <p class="notice_detail_title">{{problemContent.title}}</p>
    <p class="detail_info">
      <span>作者：币家资讯</span>
      <span class="bbm_fr">发布时间：{{problemContent.time}}</span>
    </p>

    <div class="detail_content">
      <p>{{problemContent.content}}</p>
    </div>

  </div>

</template>

<style>
  @import "../../assets/css/help.css";
</style>

<script>
  import {problemContentById} from '../../api/problem'
  export default {
    data () {
      return {
        problemContent: {
          title: '',
          time: ''
        }
      }
    },

    methods: {},

    mounted(){
      this.problemContent = problemContentById(this.$route.params.id);
    },

    components: {}
  }
</script>

