<template>

  <div class="user_details">

    <div class="primary">
      <p>
        <img src="../../assets/images/icon_yes.png">
        <span>已通过初级实名认证</span>
      </p>

      <div class="primary_info">
        <ul>
          <li>
          <li>姓名：蓝蓝</li>
          <li>证件类型：身份证</li>
          <li>证件号码：4416**********3044</li>
          <li>认证时间：2018-03-12 09:17:10</li>
        </ul>
      </div>
    </div>

    <div class="senior">
      <p>
        <img src="../../assets/images/icon_no.png">
        <span>未通过高级实名认证</span>
      </p>

      <div class="senior_identity">
        <div class="clearfix">
          <div class="bbm_fl">
            <img src="../../assets/images/addimg.png">
            <p class="explain">手持证件正面照（不大于1M）</p>
          </div>

          <div class="bbm_fr">
            <img src="../../assets/images/addimg.png">
            <p class="explain">手持证件反面照（不大于1M）</p>
          </div>
        </div>
        <button class="btn upload_btn">确定上传</button>
      </div>
    </div>

    <div class="set_verify_img clearfix">
      <div class="sv_title">高级实名认证信息流程：</div>
      <div class="smrz_remind">
        <p>
          <span>1.</span>请上传您本人手持身份证正反面的照片，务必于上方认证信息一致，务必保证身份证上的文字信息 &nbsp;&nbsp;&nbsp;无遮挡且清晰可读，否则影响您的身份认证。
        </p>
        <p>
          <span>2.</span>审核更改申请；审核完成后，客服通知您申请是否通过；
        </p>
        <p>
          <span>3.</span>审核失败，则请您根据提示信息重新提交申请。
        </p>
      </div>
      <div class="set_verify_img_pic">
        <div class="sv_pic">
          <img src="../../assets/images/pic_shouchi.png">
        </div>
        <p>手持身份证头部照示例</p>
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

