import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'root',
    redirect: '/signIn'
  },
  {
    path: '/signIn',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import ('../views/Register')
  },
  {
    path: '/home',
    name: 'home-page',
    component: () =>
      import ('../views/HomePage')
  },
  {
    path: '/posts/:id',
    name: 'single-post',
    component: () =>
      import ('../views/SinglePost')
  },
  {
    path: '/admin',
    name: 'admin-root',
    component: () =>
      import ('../views/Admin'),
    redirect: '/admin/signIn',
    children: [{
        path: 'users',
        name: 'admin-users',
        component: () =>
          import ('../components/AdminUserList')
      },
      {
        path: 'posts',
        name: 'admin-posts',
        component: () =>
          import ('../components/AdminPostList')
      },
    ]
  },
  {
    path: '/admin/signIn',
    name: 'admin-sign-in',
    component: () =>
      import ('../views/AdminSignIn')
  },
  {
    path: '/users/:userAccount',
    name: 'personal-page-root',
    component: () =>
      import ('../views/PersonalPage'),
    redirect: '/users/:userAccount/posts',
    children: [{
        path: 'posts',
        name: 'personal-page-posts',
        component: () =>
          import ('../components/PostBlockShort')
      },
      {
        path: 'replies',
        name: 'personal-page-replies',
        component: () =>
          import ('../components/ReplyBlock')
      },
      {
        path: 'liked',
        name: 'personal-page-liked',
        component: () =>
          import ('../components/PostBlockShort')
      },
    ]
  },
  {
    path: '/users/:userAccount/follow',
    name: 'follow-page-root',
    component: () =>
      import ('../views/FollowPage'),
    redirect: '/users/:userAccount/follow/followers',
    children: [{
        path: 'followers',
        name: 'follow-page-followers',
        component: () =>
          import ('../components/FollowUsers')
      },
      {
        path: 'followings',
        name: 'follow-page-following',
        component: () =>
          import ('../components/FollowUsers')
      },
    ]
  },
  {
    path: '/users/:userAccount/setting',
    name: 'setting-page',
    component: () =>
      import ('../views/SettingPage')
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import ('../views/PageNotFound')
  }
]

const router = new VueRouter({
  routes
})

export default router