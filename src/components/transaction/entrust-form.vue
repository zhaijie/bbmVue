<template>
  <div class="bbm_fl">
    <input type="hidden" v-model="currentPrice">
    <p class="title">
      可用{{availableAssets.currencyName}}：<span>{{availableAssets.num ? availableAssets.num : '请先登录'}}</span>
    </p>
    <div class="input_item" v-for="(item, index) in inputData">
      <p>{{item.title}} <a v-if="index === 2"><img src="../../assets/images/icon_set.png" class="bbm_fr"></a></p>
      <m-input :inputInfo="item.info" :class="{'bold':index === 0}" :value="item.info.value" v-model="item.info.value"
               @input="valueChange"></m-input>
      <input ref="rangInput" type="range" class="count_rang padding0" v-model="rangeCount" v-if="index === 1"
             :disabled="!$store.state.loginState">
      <transition name="list" appear>
        <div class="check_tip" v-if="item.info.check">{{item.info.errorText}}</div>
      </transition>
    </div>

    <p class="not_password">
      交易密码已关闭/未设置
      <a href="#"><img src="../../assets/images/icon_set.png" class="bbm_fr"></a>
    </p>
    <p class="count_price">
      <span>合计：</span>
      {{total}} {{availableAssets.ywm_m}}
    </p>
    <m-button :buttonInfo="buttonInfo" @buttonClick="buySellCurrency(buttonInfo)"></m-button>

  </div>
</template>

<script type="text/ecmascript-6">
  import MButton from '../../components/public/m-button';
  import MInput from '../../components/public/m-input';

  export default {
    props: ['inputData', 'availableAssets', 'buttonInfo'],
    data(){
      return {
        total: 0,
        rangeCount: 0,
        currentPrice: 0,
        buttonLoadingImg: require('../../assets/images/button_loading.gif'),
        submitState: false
      }
    },
    methods: {
      //买卖操作
      buySellCurrency(){
        this.$forceUpdate();
        if (this.submitState) return; //防止重复提交
        let self = this;
        //判断表单是否输入
        for (let item of this.inputData) {
          if (item.info.value === '') {
            item.info.check = true;
            setTimeout(function () {
              self.$forceUpdate();
              item.info.check = false;
            }, 3000);
            return;
          }
        }
        this.submitState = true;

        //委托成功回调，初始化input值
        this.buttonInfo.handle(this.buttonInfo).then(function (data) {
          if (data) {
            self.$forceUpdate();
            self.inputData[1].info.value = '';
            self.inputData[2].info.value = '';
          }
          self.submitState = false
        });
        this.buttonInfo.text = '<img src=' + this.buttonLoadingImg + ' width="20">';
      },

      //限制表单输入
      valueChange(value, target){
        let re = new RegExp("^[0-9]+([.]{1}[0-9]{0," + this.availableAssets.ws + "})?$");
        let self = this;
        setTimeout(function () {
          if (!re.test(value)) {
            target.value = '';
            self.countTotal()
          }
        }, 100);
        this.countTotal()
      },

      //买卖input单价赋值
      setBuySellPrice(price){
        this.inputData[0].info.value = price;
        this.countTotal();
        this.currentPrice = price;
      },

      //买卖合计
      countTotal() {
        let total = (this.inputData[0].info.value * this.inputData[1].info.value).toFixed(this.availableAssets.ws);
        this.total = isNaN(total) ? 0 : total;
      },
    },

    watch: {
      //监听滑动条
      rangeCount: function (val) {
        let availableNum = this.availableAssets.num; //可用数量
        if (this.availableAssets.id === 1) { //买入数量
          let currentPrice = this.inputData[0].info.value; //当前价格
          this.inputData[1].info.value = (availableNum / currentPrice * (val / 100)).toFixed(this.availableAssets.ws); //可买数量
        } else { //卖出数量
          this.inputData[1].info.value = (availableNum * (val / 100)).toFixed(this.availableAssets.ws); //可买数量
        }
        //计算总价改变活动条颜色
        this.countTotal();
        this.$refs.rangInput[0].style.backgroundSize = val + '% 100%';
      }
    },

    components: {MButton, MInput}
  }
</script>


