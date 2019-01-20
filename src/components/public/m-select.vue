<template>

  <div class="my_select" @click.stop>
    <span class="select_value" @click="showSelect()">
      {{selectValue}}
    </span>
    <img src="../../assets/images/icon_select.png" class="select_icon">
    <ul v-for="item in selectList.data" v-if="selectListState" @click="selectItem(item)">
      <li>{{item.enName}}</li>
    </ul>
  </div>
</template>

<style>
  @import "../../assets/css/public/select.css";
</style>

<script type="text/ecmascript-6">
  export default {
    props: ['selectList'],
    data(){
      return {
        selectListState: false,
        selectValue: '请选择',
      }
    },
    methods: {
      showSelect(){
        this.selectListState = !this.selectListState;
      },
      selectItem(item){
        this.selectListState = false;
        this.selectValue = item.enName;
        if (this.selectList.handle) {
          this.selectList.handle(item)
        }
      }
    },
    mounted(){
      this.selectValue = this.selectList.data[0].enName;
    },
    created(){
      let self = this;
      this.$vue.$on('hideSelectList', () => {
        if (self.selectListState) {
          self.selectListState = false
        }
      })
    },
  }
</script>


