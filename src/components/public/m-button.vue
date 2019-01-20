<template>

  <div>
    <button ref="myButton" class="btn" :class="buttonInfo.addClass" @click="$emit('buttonClick',buttonInfo)"
            v-html="buttonInfo.text">
    </button>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: ['buttonInfo'],
    data(){
      return {
        buttonLoadingImg: require('../../assets/images/button_loading.gif'),
      }
    },
    methods: {
//      requestClick(){
//        this.$emit('buttonClick', this.buttonInfo);
//        this.buttonInfo.text = '<img src=' + this.buttonLoadingImg + ' width="20">';
//      }
    },
    mounted(){
    },
  }
</script>


