import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CompanyHome from '@/components/company/company-home'
import Information from '@/components/company/information'
import QueryResume from '@/components/company/query-resume'
import Recruit from '@/components/company/recruit'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/table'
    },
    {
      path: '/',
      name: 'HelloWorld',
       component: resolve => require(['../components/common/Home.vue'], resolve)
    },
    {
      path: '/table',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      meta: { title: '自述文件'},
      children:[
        // {
        //   path: '/dashboard',
        //   component: resolve => require(['../components/page/Dashboard.vue'], resolve),
        //   meta: { title: '系统首页'}
        // },
        {
          path: '/table',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve),
          meta: { title: '应聘者管理' }
        },
        {
          path: '/tabs',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: { title: '企业管理'}
        }
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


