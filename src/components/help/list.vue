<template>

  <ul class="notice_list">
    <li v-for="item in problemItem" @click="$router.push('/help/details/'+item.id)">
      <span>{{item.title}}</span> <span class="bbm_fr">2018-06-15</span>
    </li>
  </ul>


</template>

<style>
  @import "../../assets/css/help.css";
</style>

<script>

  import {problemList} from '../../api/problem'

  export default {
    data () {
      return {
        problemItem: []
      }
    },
    methods: {
      problemListById(){

        let problemId = this.$route.params.id;
        let list = problemList();
        let self = this;
        list.forEach(function (v) {
          if (v.id + '' === problemId) {
            self.problemItem = v.list;
          }
        })

      },
    },

    mounted(){
      this.problemListById();
    },
    watch: {
      $route(){
        this.problemListById();
      }
    },


  }
</script>

