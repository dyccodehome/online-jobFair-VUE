// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bootstrapVue from 'bootstrap-vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import iView from 'iview';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import $ from 'jquery';
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts; //引入组件
import 'iview/dist/styles/iview.css';

Vue.use(bootstrapVue)
Vue.use(element)
Vue.prototype.$http = axios
Vue.use(iView);
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = 'http://localhost:8080/';
Vue.use($);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
