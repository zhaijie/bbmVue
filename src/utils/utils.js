/**
 * Created by Administrator on 2018/7/6 0006.
 */

import http from '../api/http'

export default {
  //动画进场
  fadeIn(sourceArr, targetArr, timer){
    return new Promise((resolve) => {
      if (!sourceArr) {
        return
      }
      timer = timer === undefined ? 80 : timer;
      let currentIndex = 0;
      let interval = setInterval(function () {
        targetArr.push(sourceArr[currentIndex]);
        currentIndex++;
        if (currentIndex === sourceArr.length) {
          currentIndex = 0;
          clearInterval(interval);
          resolve()
        }
      }, timer)
    });
  },
};

//手机号码密文显示
export function cipherText(text) {
  let text1 = text.substring(0, 3);
  let text2 = text.substring(text.length - 4, text.length);
  return text1 + '*****' + text2
}

//获取验证码
export function getCode(params, callback) {
  http.post('/app/user/getCode', params, function (data, meg) {
    callback(data, meg)
  })
}

//验证码倒计时
export function disableWait(timer) {
  let codeTimer = setTimeout(function () {
    timer--;
    if (timer < 0) {
      timer = 10;
      clearInterval(codeTimer);
      return '重新获取';
    }
    return timer + 's';
  }, 1000);
}


