import { apiHelper } from '../utils/helpers'

export default {
  signIn ( { account, password }) {
    return apiHelper.post('/admin/signin', {
      account,
      password
    })
  },
  getPosts () {
    return apiHelper.get('/admin/tweets')
  },
  deletePost (id) {
    return apiHelper.delete(`/admin/tweets/${id}`)
  },
  getUsers () {
    return apiHelper.get('/admin/users')
  }
}