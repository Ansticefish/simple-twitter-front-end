import { apiHelper } from "../utils/helpers";

export default {
    signIn({ account, password }) {
        return apiHelper.post('/users/signin', {
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
    }

}