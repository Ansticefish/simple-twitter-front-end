<template>
  <div v-show="!isLoading" class="posts">
    <PostBlockShort :initial-posts="posts" />
  </div>
</template>

<script>
import PostBlockShort from "../components/PostBlockShort.vue";
import userAPI from "../apis/users";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "PersonalPosts",
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
    async fectchPosts(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.getUserPosts(userId);
        if (!data.message) {
          this.posts = [...data];
        } else {
          this.posts = [];
          Toast.fire({
            title: "使用者尚無推文",
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
    this.fectchPosts(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fectchPosts(id);
    next();
  },
};
</script>