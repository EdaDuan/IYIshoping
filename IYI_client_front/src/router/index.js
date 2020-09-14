import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "",
    redirect: "/home"
  },
  // 首页
  {
    path: "/home",
    component: () => import("../views/home/home.vue")
  },
  // 分类
  {
    path: "/classify",
    component: () => import("../views/classify/classify.vue"),
    children: [{
        path: "male",
        component: () => import("../views/classify/classifymale.vue"),
        meta: {
          sex: false
        }
      },
      {
        path: "female",
        component: () => import("../views/classify/classifyfemale.vue"),
        meta: {
          sex: true
        }
      },

    ]
  },
  // 购物车
  {
    path: "/shopcart",
    component: () => import("../views/shopcart/shopcart.vue")
  },
  // 搜索
  {
    path: "/search",
    component: () => import("../views/search/serach.vue")
  },
   // 详情页面
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail/Detail.vue')
  },
  //个人中心
  {
    path: '/person',
    name: 'person',
    component: () => import('../views/person/person.vue'),
    beforeEnter: (to, from, next) => {
      if(JSON.parse(localStorage.getItem("user"))){
        next();
      }else{
        next('/home');
      }
    }
  
  },

]

const router = new VueRouter({
  routes
})

export default router