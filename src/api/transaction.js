/**
 * Created by Administrator on 2018/7/2 0002.
 */
import http from './http';

//根据市场id获取成交记录
export function getRecordByUser(params, callback) {
  http.post('/app/trading/tradingRecord', params, function (data) {
    callback(data)
  })
}

//获取所有成交记录
export function getRecordByScId(params, callback) {
  http.get('/getDealRecord', params, function (data) {
    for (let item of data.msg) {
      item.sj = item.sj.split(' ')[1]
    }
    callback(data)
  })
}

//获取卖单
export function getSellEntrust(params, callback) {
  http.get('/buyOut', params, function (data) {
    callback(data)
  })
}

//获取买单
export function getBuyEntrust(params, callback) {
  http.get('/buyIn', params, function (data) {
    callback(data)
  })
}

//根据scid获取资产,并限制小数位
export function getAssetsByScId(params, ws, callback) {
  http.post('/app/trading/getZc', params, function (data) {
    if (data) {
      for (let property in data) {
        data[property] = data[property].toFixed(ws)
      }
      callback(data);
    }
  })
}

//获取我的资产
export function getBalances(params, callback) {
  http.post('/app/trading/getTradingAssets', params, function (data) {
    callback(data)
  })
}

//获取我的委托
export function getUserEntrust(params, callback) {
  http.post('/app/trading/entrustRecord', params, function (data) {
    callback(data)
  })
}

///app/trading/sell
export function sell(params, callback) {
  http.post('/app/trading/sell', params, function (data) {
    callback(data)
  })
}


//获取买卖表单信息
export function getBuySellForm(buyVal, sellVal) {
  let userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : '';
  let buyForm = [
    {
      title: '买入单价',
      info: {
        name: 'buyPrice',
        placeholder: '',
        value: buyVal,
        width: '266',
        type: 'text',
        check: false,
        errorText: '不能为空',
        disabled: !userInfo
      }
    },
    {
      title: '买入数量',
      info: {
        name: 'buyNum',
        placeholder: '',
        value: '',
        width: '266',
        type: 'text',
        check: false,
        errorText: '不能为空',
        disabled: !userInfo
      }
    }
  ];
  let sellForm = [
      {
        title: '卖出单价',
        info: {
          name: 'sellPrice',
          placeholder: '',
          value: sellVal,
          width: '266',
          type: 'text',
          check: false,
          errorText: '不能为空',
          disabled: !userInfo
        }
      },
      {
        title: '卖出数量',
        info: {
          name: 'sellNum',
          placeholder: '',
          value: '',
          width: '266',
          type: 'text',
          check: false,
          errorText: '不能为空',
          disabled: !userInfo
        }
      }
    ]
  ;
  if (userInfo.ispwd === 2) {
    buyForm.push({
      title: '交易密码',
      info: {
        name: 'tranPassword',
        placeholder: '',
        value: '',
        width: '266',
        type: 'password',
        check: false,
        errorText: '不能为空'
      }
    });
    sellForm.push({
      title: '交易密码',
      info: {
        name: 'tranPassword',
        placeholder: '',
        value: '',
        width: '266',
        type: 'password',
        check: false,
        errorText: '不能为空'
      }
    })
  }

  return {buyForm: buyForm, sellForm: sellForm}
}

//资产tab
export function getAssetsTabs(state) {
  return [
    {id: 1, title: '我的资产', state: state},
    {id: 2, title: '我的委托', state: false},
    {id: 3, title: '成交记录', state: false},
  ]
}

//资产买卖button信息
export function getButtonInfo(params) {
  function buttonChange(buttonInfo, resolve) {
    let text = buttonInfo.text;
    let url = text === '买入' ? 'buy' : 'sell';
    let sendData = params(url);

    http.post('/app/trading/' + url, sendData, function (data, msg) {
      if (data) {
        buttonInfo.addClass = 'result_btn';
        buttonInfo.text = '委托成功';
        resolve(true);
        setTimeout(function () {
          buttonInfo.addClass = text === '买入' ? 'buy_btn' : 'sell_btn';
          buttonInfo.text = text;
        }, 2000)
      } else {
        buttonInfo.text = msg;
        setTimeout(function () {
          buttonInfo.text = text;
          resolve(false);
        }, 2000)
      }
    });
  }

  return {
    buy: {
      text: '买入', addClass: 'buy_btn', handle: function (buttonInfo) {
        return new Promise((resolve) => {
          buttonChange(buttonInfo, resolve);
        })
      }
    }, sell: {
      text: '卖出', addClass: 'sell_btn', handle: function (buttonInfo) {
        return new Promise((resolve) => {
          buttonChange(buttonInfo, resolve);
        })
      }
    }
  }
}




