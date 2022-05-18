<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="main col-lg-7 col-xl-7">
        <SinglePostheader />
        <PostBlockFull
          :post="post"
          @replyPost="openReplyModal"
          @likePost="likePost"
          @unlikePost="unlikePost"
        />
        <ReplyBlock :replies="replies" />
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers />
      </div>
      <div class="modal-backdrop" v-if="openReply">
        <CreateReplyModal
          :post="post"
          :currentUser="currentUser"
          @closeReplyModal="closeReplyModal"
          @add-reply="addReply"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import SinglePostheader from "../components/SinglePostHeader.vue";
import PostBlockFull from "../components/PostBlockFull.vue";
import ReplyBlock from "../components/ReplyBlock.vue";
import CreateReplyModal from "../components/CreateReplyModal.vue";

import { mapState } from "vuex";
import postAPI from "../apis/posts";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "SinglePost",
  components: {
    SideBar,
    PopularUsers,
    SinglePostheader,
    PostBlockFull,
    ReplyBlock,
    CreateReplyModal,
  },
  data() {
    return {
      post: {
        id: -1,
        description: "",
        UserId: -1,
        replyCount: 0,
        likeCount: 0,
        createdAt: "",
        updatedAt: "",
        TweetUser: {
          id: -1,
          account: "",
          name: "",
          avatar: "",
        },
        isLiked: false,
      },
      replies: [],
      openReply: false,
    };
  },
  methods: {
    async fetchPost(postId) {
      try {
        const { data } = await postAPI.getPost(postId);
        const {
          id,
          description,
          UserId,
          replyCount,
          likeCount,
          createdAt,
          TweetUser,
          isLiked,
        } = data;
        this.post = {
          id,
          description,
          UserId,
          replyCount,
          likeCount,
          createdAt,
          TweetUser: { ...TweetUser },
          isLiked,
        };
        return TweetUser;
      } catch (err) {
        console.log(err.message);
        Toast.fire({
          title: "無法取得貼文資料",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    async fetchReplies(postId) {
      try {
        const { data } = await postAPI.getPostReplies(postId);
        if (!data.message) {
          this.replies = [...data];
        }
      } catch (err) {
        console.log(err.message);
        Toast.fire({
          title: "無法取得回覆資料",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    likePost() {
      this.post.isLiked = true;
      this.fetchPost(this.post.id);
    },
    unlikePost() {
      this.post.isLiked = false;
      this.fetchPost(this.post.id);
    },
    openReplyModal() {
      this.openReply = true;
    },
    closeReplyModal() {
      this.openReply = false;
    },
    addReply() {
      this.post.replyCount++;
      this.fetchReplies(this.post.id);
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchPost(id);
    this.fetchReplies(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchPost(id);
    this.fetchReplies(id);
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/modal.scss";
.modal-backdrop {
  @extend %modal-backdrop;
}
.main {
  @extend %main-container_;
}
</style>