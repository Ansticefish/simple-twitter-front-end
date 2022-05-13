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
        path: '/setting/:userAccount',
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

router.beforeEach((to, from, next) => {
    //get currentUser data from vuex 
    const token = localStorage.getItem('token')
    let isAuthenticated = store.state.isAuthenticated
    let role = store.state.currentUser.role

    //if token is different
    if (token && token !== store.state.token) {
        // ask API to fetch currentUser again, and set isAuthenticated value based on return value
        isAuthenticated = false
        localStorage.removeItem('token')
    }

    // isAuthenticated: false
    const pagesWithoutAuthentication = ['register', 'sign-in', 'admin-sign-in']
    const adminPages = ['admin-users', 'admin-posts']

    if (!isAuthenticated &&
        !pagesWithoutAuthentication.includes(to.name)) {
        if (from.name === 'sign-in') {
            return
        } else {
            router.push({ name: 'sign-in' })
        }
    }

    // isAuthenticated: true => users can't see sign-in-related pages
    if (isAuthenticated &&
        role == 'admin' &&
        pagesWithoutAuthentication.includes(to.name)) {
        from.name === 'admin-users' ?
            router.push('') : router.push({
                name: 'admin-users'
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
            name: 'admin-users'
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