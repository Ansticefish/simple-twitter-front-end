import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from '../apis/authorization'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {
            id: -1,
            account: '',
            name: '',
            email: '',
            avatar: '',
            role: '',
        },
        isAuthenticated: false,
        token: ''
    },
    getters: {},
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUser = {
                ...state.currentUser,
                ...currentUser
            }
            state.isAuthenticated = true
            state.token = localStorage.getItem('token')
        },
        revokeAuthentication(state) {
            state.currentUser = {}
            state.isAuthenticated = false
            state.token = ''
            localStorage.removeItem('token')
            sessionStorage.removeItem('currentUser')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('isAuthenticated')
        }
    },
    actions: {
        async fetchCurrentUser () {
            try {
                const { data } = await authorizationAPI.getCurrentUser()

                const { id, account, name, email, avatar, role } = data

                this.commit('setCurrentUser', {
                    id,
                    account,
                    name,
                    email,
                    avatar,
                    role
                })

                return true

            } catch(error) {
                console.log('error', error)
                this.commit('revokeAuthentication')
                return false
            }
            
        } 
    },
    modules: {}
})