<template>
  <div v-show="!isLoading" class="like-posts">
    <PostBlockShort :initial-posts="posts" />
  </div>
</template>

<script>
import PostBlockShort from "../components/PostBlockShort.vue";
import userAPI from "../apis/users";
import { Toast, ToastIcon } from "../utils/helpers";
export default {
  name: "PersonalLiked",
  components: {
    PostBlockShort,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },
  methods: {
    async fectchLikedPosts(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.getUserLikes(userId);
        if (!data.message) {
          this.posts = data.map((post) => ({
            ...post.Tweet,
            TweetUser: post.TweetUser,
            isLiked: post.isLiked,
          }));
        } else {
          this.posts = [];
          Toast.fire({
            title: "使用者尚無喜歡的推文",
            html: ToastIcon.blueInformHtml,
          });
        }
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取得使用者推文",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
  },
   created() {
    const { id } = this.$route.params;
    this.fectchLikedPosts(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fectchLikedPosts(id);
    next();
  },
};
</script>