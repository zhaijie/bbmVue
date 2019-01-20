import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

//首页
const Home = (resolve) => {
  import('../components/index').then((module) => {
    resolve(module)
  })
};

//用户中心
const User = (resolve) => {
  import('../components/user').then((module) => {
    resolve(module)
  })
};

//帮助中心
const Help = (resolve) => {
  import('../components/help').then((module) => {
    resolve(module)
  })
};

//登录
const Login = (resolve) => {
  import('../components/login').then((module) => {
    resolve(module)
  })
};

//交易中心
const Transaction = (resolve) => {
  import('../components/transaction').then((module) => {
    resolve(module)
  })
};

//用户中心--我的信息
const UserInfo = (resolve) => {
  import('../components/user/info').then((module) => {
    resolve(module)
  })
};

//用户中心--钱包地址
const UserWallet = (resolve) => {
  import('../components/user/wallet').then((module) => {
    resolve(module)
  })
};

//用户中心--我的银行卡
const UserBankCard = (resolve) => {
  import('../components/user/bankCard').then((module) => {
    resolve(module)
  })
};

//用户中心--我的资产
const UserAssets = (resolve) => {
  import('../components/user/assets').then((module) => {
    resolve(module)
  })
};

//用户中心--C2C交易
const UserC2C = (resolve) => {
  import('../components/user/c2c').then((module) => {
    resolve(module)
  })
};

//用户中心--C2C订单详情
const UserC2COrderDetails = (resolve) => {
  import('../components/user/c2cOrderDetails').then((module) => {
    resolve(module)
  })
};


//用户中心--转出数字资产
const UserTurnOut = (resolve) => {
  import('../components/user/turnOut').then((module) => {
    resolve(module)
  })
};

//用户中心--转出数字资产
const UserTurnIn = (resolve) => {
  import('../components/user/turnIn').then((module) => {
    resolve(module)
  })
};

//用户中心--委托管理
const UserEntrust = (resolve) => {
  import('../components/user/entrust').then((module) => {
    resolve(module)
  })
};

//用户中心--成交记录
const UserRecord = (resolve) => {
  import('../components/user/record').then((module) => {
    resolve(module)
  })
};

//用户中心--成交记录
const UserRealName = (resolve) => {
  import('../components/user/realName').then((module) => {
    resolve(module)
  })
};

//用户中心--谷歌认证
const UserGoogle = (resolve) => {
  import('../components/user/google').then((module) => {
    resolve(module)
  })
};

//用户中心--密码修改
const UserChangePassword = (resolve) => {
  import('../components/user/changePassword').then((module) => {
    resolve(module)
  })
};

//用户中心--交易设置
const UserSetTrade = (resolve) => {
  import('../components/user/setTrade').then((module) => {
    resolve(module)
  })
};


//帮助中心--常见问题
const HelpProblem = (resolve) => {
  import('../components/help/problem').then((module) => {
    resolve(module)
  })
};

//帮助中心--帮助列表
const HelpList = (resolve) => {
  import('../components/help/list').then((module) => {
    resolve(module)
  })
};

//帮助中心--帮助细节
const HelpDetails = (resolve) => {
  import('../components/help/details').then((module) => {
    resolve(module)
  })
};


export default new Router({
  // mode: 'history',
  routes: [
    {path: "*", redirect: '/index'},//路由重定向
    {path: '/index', name: 'index', meta: {title: '首页'}, component: Home,},
    {path: '/form/:type', name: 'form', meta: {title: '登录注册'}, component: Login},
    {path: '/transaction/:scid', name: 'transaction', meta: {title: '交易中心'}, component: Transaction},
    {
      path: '/help', name: 'help', meta: {title: '帮助中心'}, component: Help,
      children: [
        {path: '/help', redirect: '/help/problem'},
        {path: '/help/problem', name: 'helpProblem', meta: {title: '常见问题'}, component: HelpProblem},
        {path: '/help/list/:id', name: 'helpList', meta: {title: '问题列表'}, component: HelpList},
        {path: '/help/details/:id', name: 'helpDetails', meta: {title: '问题详情'}, component: HelpDetails},
      ]
    },
    {
      path: '/user', name: 'user', component: User,
      children: [
        {path: '/user', redirect: '/user/info'},
        {path: '/user/info', name: 'userInfo', meta: {title: '个人中心'}, component: UserInfo},
        {path: '/user/wallet', name: 'userWallet', meta: {title: '钱包地址'}, component: UserWallet},
        {path: '/user/bankCard', name: 'userBankCard', meta: {title: '我的银行卡'}, component: UserBankCard},
        {path: '/user/assets', name: 'userAssets', meta: {title: '我的资产'}, component: UserAssets},
        {path: '/user/c2c', name: 'userC2C', meta: {title: 'C2C交易'}, component: UserC2C},
        {path: '/user/c2cOrderDetails', name: 'userC2COrder', meta: {title: 'C2C交易'}, component: UserC2COrderDetails},
        {path: '/user/turnOut', name: 'userTurnOut', meta: {title: '转入数字资产'}, component: UserTurnOut},
        {path: '/user/turnIn', name: 'userTurnIn', meta: {title: '转出数字资产'}, component: UserTurnIn},
        {path: '/user/entrust', name: 'userEntrust', meta: {title: '委托管理'}, component: UserEntrust},
        {path: '/user/record', name: 'userRecord', meta: {title: '成交记录'}, component: UserRecord},
        {path: '/user/realName', name: 'userRealName', meta: {title: '实名认证'}, component: UserRealName},
        {path: '/user/google', name: 'userGoogle', meta: {title: '谷歌认证'}, component: UserGoogle},
        {path: '/user/changePassword/:type', name: 'cPassword', meta: {title: '密码修改'}, component: UserChangePassword},
        {path: '/user/setTrade', name: 'userSetTrade', meta: {title: '交易设置'}, component: UserSetTrade},
      ]
    },
  ]
})
