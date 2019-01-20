/**
 * Created by Administrator on 2018/7/10 0010.
 */

//侧边栏菜单
export function getHelpMenuList() {
  return [
    {
      menuTitle: '常见问题', menuIcon: require('../assets/images/icon_que.png'),
      submenu: [
        {title: '登录注册', url: '/help/list/1'},
        {title: '关于交易', url: '/help/list/2'},
        {title: '充值提现', url: '/help/list/3'},
        {title: '账户锁定', url: '/help/list/4'},
        {title: '转出转入', url: '/help/list/5'},
        {title: '服务支持', url: '/help/list/6'},
      ]
    },
    {
      menuTitle: '公告资讯', menuIcon: require('../assets/images/icon_information.png'),
      submenu: [
        {title: '网站公告', url: '/help/list/7'},
        {title: '币圈资讯', url: '/help/list/8'},
        {title: '热点资讯', url: '/help/list/9'},
        {title: '币种介绍', url: '/help/list/10'}
      ]
    },
    {
      menuTitle: '平台相关',
      menuIcon: require('../assets/images/icon_about.png'),
      submenu: [
        {title: '平台相关', url: '/help/details/1'},
        {title: '平台简介', url: '/help/details/2'},
        {title: '联系我们', url: '/help/details/3'},
        {title: '网站地图', url: '/help/details/4'}
      ]
    },
    {
      menuTitle: '法律条款',
      menuIcon: require('../assets/images/icon_law.png'),
      submenu: [
        {title: '用户协议', url: '/help/details/5'},
        {title: '隐私政策', url: '/help/details/6'},
        {title: '防洗钱', url: '/help/details/7'},
        {title: '风险协议', url: '/help/details/8'},
      ]
    },
  ]
}
