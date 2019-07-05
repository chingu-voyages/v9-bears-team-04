import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import BooksList from '@/components/BooksList'
import BookView from '@/components/BookView'
import Register from '@/components/Register'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/books-list',
      name: 'BooksList',
      component: BooksList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/book/:bookID',
      name: 'BookView',
      component: BookView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(localStorage.getItem('access_token'))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
