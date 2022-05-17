import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  getPosts() {
    return apiHelper.get('/tweets')
  },
  getPost(postId) {
    return apiHelper.get(`/tweets/${postId}`)
  },
  // untest
  getPostReplies(postId) {
    return apiHelper.get(`/tweets/${postId}/replies`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  createPost({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  // untest
  createReply({ postId, userId, content }) {
    return apiHelper.post(`/tweets/${postId}/replies`, { userId, content })
  },
  likePost(postId) {
    return apiHelper.post(`/tweets/${postId}/like`, null)
  },
  unlikePost(postId) {
    return apiHelper.post(`/tweets/${postId}/unlike`, null, )
  }
}