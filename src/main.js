// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'; // 导入样式
import iView from 'iview';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import $ from 'jquery';
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts; //引入组件

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = 'http://localhost:8080/';
Vue.use($);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App ,iView},
  template: '<App/>'
})
