<template>
  <div v-show="!isLoading" class="replies">
    <ReplyBlock :replies="replies" />
  </div>
</template>

<script>
import ReplyBlock from "../components/ReplyBlock.vue";
import userAPI from "../apis/users";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "PersonalReplies",
  components: {
    ReplyBlock,
  },
  data() {
    return {
      replies: [],
      isLoading: false,
    };
  },
  methods: {
    async fectchReplies(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.getUserReplies(userId);
        if (!data.message) {
          this.replies = [...data];
        } else {
          this.replies = [];
          Toast.fire({
            title: "使用者無回覆紀錄",
            html: ToastIcon.blueInformHtml,
          });
        }
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取得使用者回覆",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fectchReplies(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fectchReplies(id);
    next();
  },
};
</script>