import Vue from 'vue'
import Router from 'vue-router'
import SignIn from "../components/Signin&SignUp/SignIn";
import SignUp from "../components/Signin&SignUp/SignUp";
import Index from "../components/Index"
import AdminHome from "../components/AdminHome";
import EmployeeHome from "../components/EmployeeHome";
import CompanyHome from '@/components/company/company-home'
import Information from '@/components/company/information'
import QueryResume from '@/components/company/query-resume'
import Recruit from '@/components/company/recruit'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component:Index,
      redirect:'/sign_in',
      children:[
        {
          path:'/sign_in',
          name:'登录',
          component:SignIn,
        },
        {
          path:'/sign_up',
          name:'注册',
          component:SignUp,
        }
      ]
    },
    {
      path: '/admin',
      component: AdminHome,
      name:'管理员主页'
    },
    {
      path: '/employee',
      component: EmployeeHome,
      name: '个人主页'
    },
    {
      path: '/company-home',
      name: 'company-home',
      component: CompanyHome,
      title:'企业主页',
      children:[
        { path: 'information',title: '企业信息', name: 'information', component: resolve => { require(['@/components/company/information.vue'],resolve);}},
        { path: 'recruit',title: '招聘信息', name: 'recruit', component: resolve => { require(['@/components/company/recruit.vue'],resolve);}},
        { path: 'queryResume',title: '简历信息', name: 'queryResume', component: resolve => { require(['@/components/company/query-resume.vue'],resolve);}},
      ]
    }
  ]
})
