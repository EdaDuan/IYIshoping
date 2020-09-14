import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/home",
    component: () => import("../views/home/home.vue"),
    children: [
      {
        path:"",
        redirect:"user"  
      },
      {
        path: "user",
        component: () => import("../views/home/homechildcnp/user/user.vue")
      },
      {
        path: "banner",
        component: () => import("../views/home/homechildcnp/banner/banner.vue")
      }, 
      {
        path: "goods",
        component: () => import("../views/home/homechildcnp/goods/goods.vue")
      }, 
      
      {
        path: "orders",
        component: () => import("../views/home/homechildcnp/orders/orders.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    if (JSON.parse(localStorage.getItem("admin"))) {
      next("/home")
    } else {
      next()
    }
  } else if (to.path == "/home") {
    if (JSON.parse(localStorage.getItem("admin"))) {
      next()
    } else {
      next('/')
    }
  } else {
    if (JSON.parse(localStorage.getItem("admin"))) {
      next()
    } else {
      next('/')
    }
  }

})

export default router