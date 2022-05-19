import { Toast, ToastIcon } from '../utils/helpers'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
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
        path: '/users/:id',
        name: 'personal-page-root',
        component: () =>
            import ('../views/PersonalPage'),
        redirect: '/users/:id/posts',
        children: [{
                path: 'posts',
                name: 'personal-page-posts',
                component: () =>
                    import ('../views/PersonalPosts')
            },
            {
                path: 'replies',
                name: 'personal-page-replies',
                component: () =>
                    import('../views/PersonalReplies')
            },
            {
                path: 'liked',
                name: 'personal-page-liked',
                component: () =>
                    import('../views/PersonalLiked')
            },
        ]
    },
    {
        path: '/users/:id/follow',
        name: 'follow-page-root',
        redirect: '/users/:id/follow/followers',
    },
    {
        path: '/users/:id/follow/followers',
        name: 'follow-page-followers',
        component: () =>
            import('../views/FollowersPage')
    },
    {
        path: '/users/:id/follow/followings',
        name: 'follow-page-following',
        component: () =>
            import('../views/FollowingsPage')
    },
    {
        path: '/setting/:id',
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

router.beforeEach( async (to, from, next) => {
    //get currentUser data from vuex 
    const token = localStorage.getItem('token')
    let isAuthenticated = store.state.isAuthenticated
    let role = store.state.currentUser.role
    let userToken = store.state.token

    //if token is different
    if (token && token !== userToken) {
        isAuthenticated = await store.dispatch('fetchCurrentUser')
        role = store.state.currentUser.role
    }

    // isAuthenticated: false
    const pagesWithoutAuthentication = ['register', 'sign-in', 'admin-sign-in']
    const adminPages = ['admin-users', 'admin-posts']

    if (!isAuthenticated &&
        !pagesWithoutAuthentication.includes(to.name)) {
        if (from.name === 'sign-in' || from.name === 'admin-sign-in') {
            return
        } else if ( to.name.includes('admin')){
            router.push({ name: 'admin-sign-in' })
        } else{
            router.push({ name: 'sign-in' })
        }
    }

    // isAuthenticated: true => users can't see sign-in-related pages
    if (isAuthenticated &&
        role === 'admin' &&
        pagesWithoutAuthentication.includes(to.name)) {
        from.name === 'admin-posts' ?
            router.push('') : router.push({
                name: 'admin-posts'
            })
    } else if (isAuthenticated &&
        role !== 'admin' &&
        pagesWithoutAuthentication.includes(to.name)) {
        from.name === 'home-page' ?
            router.push('') : router.push({
                name: 'home-page'
            })
    }
    

    // separate signed-in users with roles
    if (isAuthenticated &&
        role === 'admin' &&
        !pagesWithoutAuthentication.includes(to.name) &&
        !adminPages.includes(to.name)) {
        Toast.fire({
            title: '此為後台帳號，無前台權限',
            html: ToastIcon.redCrossHtml,
        })
        router.push({
            name: 'admin-posts'
        })
    } else if (isAuthenticated &&
        role !== 'admin' &&
        !pagesWithoutAuthentication.includes(to.name) &&
        adminPages.includes(to.name)) {
        Toast.fire({
            title: '此為前台帳號，無後台權限',
            html: ToastIcon.redCrossHtml,
        })
        router.push({
            name: 'home-page'
        })
    }

    next()

})

export default router