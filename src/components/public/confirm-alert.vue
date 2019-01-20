<template>
  <transition name="list" v-if="alertState">
    <div class="alert_box">
      <div class="alert_content confirm_alert_content">
        <div class="alert_title bold">
          {{confirmInfo.title ? confirmInfo.title : '提示信息'}}
          <img src="../../assets/images/icon_fork.png" class="close_img" @click="close()">
        </div>

        <div class="alert_body">
          <p class="text-center confirm_text" :class="confirmInfo.addClass">{{confirmInfo.content}}</p>

          <div class="confirm_alert_btn clearfix">
            <button class="btn" v-for="item in  confirmInfo.button" :class="item.addClass" @click="ok()">
              {{item.text}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {alertMixin} from '../../utils/alertMixin';
  export default {
    props: ['confirmInfo'],
    mixins: [alertMixin],
    data(){
      return {}
    },
    methods: {
      ok(){
        this.$emit('okConfirm')
      }
    }
  }
</script>


