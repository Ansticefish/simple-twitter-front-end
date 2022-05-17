import { apiHelper } from "../utils/helpers";

export default {
    signIn({ account, password }) {
        return apiHelper.post('/signin', {
            account,
            password
        })
    },
    register({ account, name, email, password, checkPassword }) {
        return apiHelper.post('/users', {
            account,
            name,
            email,
            password,
            checkPassword
        })
    },
    getCurrentUser() {
        return apiHelper.get('/current_user')
    },

}