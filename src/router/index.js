import Vue from 'vue'
import Router from 'vue-router'
import SignIn from "../components/Signin&SignUp/SignIn";
import SignUp from "../components/Signin&SignUp/SignUp";
import Index from "../components/Index";
import AdminHome from "../components/AdminHome";
import Home from "../components/common/Home";
import BaseTable from "../components/page/BaseTable";
import Tabs from "../components/page/Tabs";
import ApplicantHome from "../components/applicant/applicant-home";
import QueryRecruit from "../components/applicant/query-recruit";
import Resume from "../components/applicant/resume";
import Selfinformation from "../components/applicant/self-information";
import CompanyHome from '@/components/company/company-home'
import Information from '@/components/company/information'
import QueryResume from '@/components/company/query-resume'
import Recruit from '@/components/company/recruit'
import CompanySignUp from "../components/Signin&SignUp/CompanySignUp";

Vue.use(Router)


export default new Router({
  mode:"history",
  routes: [
    // {
    //   path: '/sign_in',
    //   redirect: '/sign_in'
    // },
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
          path:'/applicant/sign_up',
          name:'注册',
          component:SignUp,
        },
        {
          path: '/company/sign_up',
          name:'企业注册',
          component:CompanySignUp
        }
      ]
    },

    {
      path: '/admin',
      component: Home,
      meta: { title: '系统首页'},
      children:[
        // {
        //   path: '/dashboard',
        //   component: resolve => require(['../components/page/Dashboard.vue'], resolve),
        //   meta: { title: '系统首页'}
        // },
        {
          path: '/people',
          component:BaseTable,
          meta: { title: '应聘者管理' }
        },
        {
          path: '/work',
          component: Tabs,
          meta: { title: '企业管理'}
        }
      ]
    },
    {
      path: '/applicant',
      component: ApplicantHome,
      name: 'applicant-home',
      title:'应聘者主页',
      children:[
        { path: 'self-information',title: '个人信息', name: 'information', component: resolve => { require(['@/components/applicant/self-information.vue'],resolve);}},
        { path: 'resume',title: '简历', name: 'resume', component: resolve => { require(['@/components/applicant/resume.vue'],resolve);}},
        { path: 'queryRecruit',title: '招聘信息', name: 'queryRecruit', component: resolve => { require(['@/components/applicant/query-recruit.vue'],resolve);}},
      ]
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


