<template>

  <transition name="list" v-if="alertState">
    <div class="alert_box">
      <div class="alert_content">
        <div class="alert_title">{{alertInfo.title}}
          <img src="../../assets/images/icon_fork.png" class="close_img" @click="close">
        </div>

        <div class="alert_body">
          <slot name="cnt"></slot>
          <ul>
            <li class="input_item" v-for="item in formData">
              <span class="item_title">{{item.title}}：</span>
              <div @click.stop v-if="item.type === 'select'" class="bbm_fr">
                <m-select :selectList="item.selectList"></m-select>
              </div>
              <input :type="item.type" v-if="item.type !== 'select'" :value="item.value" :readonly="item.readonly"
                     :class="item.addClass">
            </li>
          </ul>

          <slot name="cntCount"></slot>

          <div class="alert_btn_box">
            <button class="btn operate_btn" @click="close">{{alertInfo.buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import MInput from '../public/m-input';
  import MSelect from '../public/m-select';
  import {alertMixin} from '../../utils/alertMixin';

  export default {
    mixins: [alertMixin],
    props: ['formData', 'alertInfo'],
    components: {MInput, MSelect}
  }
</script>


