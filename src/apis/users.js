import { apiHelper } from "../utils/helpers";

export default {
  getUsersTop() {
    return apiHelper.get('/users/top')
  },
  getUser({ id }) {
    return apiHelper.get(`/users/${id}`)
  },
  editUserSetting({ id, account, name, email, password, checkPassword }) {
    return apiHelper.put(`/users/${id}/setting`, {
      account,
      name,
      email,
      password,
      checkPassword
    })
  },
  getUserPosts(id) {
    return apiHelper.get(`/users/${id}/tweets`)
  },
  getUserReplies(id) {
    return apiHelper.get(`/users/${id}/replied_tweets`)
  },
  getUserLikes(id) {
    return apiHelper.get(`/users/${id}/likes`)
  },
  userFollowings(id) {
    return apiHelper.get(`/users/${id}/followings`)
  },
  userFollowers(id) {
    return apiHelper.get(`/users/${id}/followers`)
  },
  followUser(id) {
    return apiHelper.post('/followships', {
      id,
    })
  },
  unfollowUser(id) {
    return apiHelper.delete(`/followships/${id}`)
  },
}