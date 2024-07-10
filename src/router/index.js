// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path:'/',
        redirect: '/login',
    },
    { 
      path:'/login',
      name:'login',
      component:()=>import("../views/Login.vue")
    },
    {
      path:'/main',
      name:'main',
      redirect:'/main/upload',
      component:()=>import("../views/Main.vue"),
      children:[
        {
          path:'upload',
          name:'upload',
          component:()=>import("../views/Upload.vue"),
        },
        {
          path:'uploadList',
          name:'uploadList',
          component:()=>import("../views/UploadList.vue")
        },
        {
          path:'setting',
          name:'setting',
          component:()=>import("../views/Setting.vue")
        }

      ]
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
