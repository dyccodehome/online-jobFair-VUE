import Vue from 'vue'
import Router from 'vue-router'
import SignIn from "../components/Signin&SignUp/SignIn";
import SignUp from "../components/Signin&SignUp/SignUp";
import Index from "../components/Index"
import AdminHome from "../components/AdminHome";
import EmployeeHome from "../components/EmployeeHome";
import CompanyHome from "../components/CompanyHome";

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
      path:'/company',
      component: CompanyHome,
      name: '企业主页'
    }
  ]
})
