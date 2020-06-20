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
import "layui-src/src/layui"
import "layui-src/src/css/layui.css"
import Moment from 'moment'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(bootstrapVue)
Vue.prototype.moment = Moment;
Vue.use(element)
Vue.prototype.$http = axios
Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
