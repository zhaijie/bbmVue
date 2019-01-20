<template>
  <div>
    <transition-group name="list" tag="table" appear>
      <tr v-for="(item, index) in entrustData" :class="type" :key="item.jg" v-show="item">
        <td width="56">{{type === 'rise' ? '买' + (index + 1) : '卖' + (entrustInfo.length - index)}}</td>
        <td @click="$emit('getCurrentPrice', item.jg)" width="92">{{item.jg}}</td>
        <td>{{item.sl}}</td>
      </tr>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['entrustInfo', 'type'],
    data(){
      return {
        entrustData: []
      }
    },
    methods: {
      entrustFadeIn(){
        this.entrustData = [];
        if (this.entrustInfo) {
          this.$utils.fadeIn(this.entrustInfo, this.entrustData);
        }
      }
    }
  }
</script>


