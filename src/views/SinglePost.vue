<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="main col-lg-7 col-xl-7">
        <SinglePostheader />
        <PostBlockFull :post="post" />
        <ReplyBlock :replies="replies" />
        <CreateReplyModal />
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import SinglePostheader from '../components/SinglePostHeader.vue'
import PostBlockFull from "../components/PostBlockFull.vue";
import ReplyBlock from "../components/ReplyBlock.vue";
import CreateReplyModal from "../components/CreateReplyModal.vue";

const dummyData = {
  tweet: {
    id: 11,
    description:
      "Nam magnam eos iusto corporis repellendus alias. Rerum voluptatem ev",
    UserId: 1,
    replyCount: 3,
    likeCount: 1,
    createdAt: "2022-05-17T02:44:15.000Z",
    updatedAt: "2022-05-17T02:44:15.000Z",
    TweetUser: {
      id: 1,
      account: "root",
      name: "root",
      avatar: "https://i.imgur.com/q6bwDGO.png",
    },
    isLiked: false,
  },
  replies: [
    {
      id: 1,
      createdAt: "2022-05-14T08:38:46.106Z",
      updatedAt: "2022-05-15T08:38:46.106Z",
      comment: "vel pharetra vel turpis nunc eget lorem dolor sed viverra",
      ReplyUser: {
        id: -1,
        name: "root",
        account: "root",
        avatar: "",
      },
      PostUser: {
        id: 1,
        name: "Hello",
        account: "Word",
      },
    },
    {
      id: 2,
      createdAt: "2022-05-14T08:38:46.106Z",
      updatedAt: "2022-05-15T08:38:46.106Z",
      comment:
        "enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra magna ac",
      ReplyUser: {
        id: -1,
        name: "root",
        account: "root",
        avatar: "",
      },
      PostUser: {
        id: 1,
        name: "Hello",
        account: "Word",
      },
    },
    {
      id: 3,
      createdAt: "2022-05-13T08:38:46.106Z",
      updatedAt: "2022-05-14T08:38:46.106Z",
      comment:
        "risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec",
      ReplyUser: {
        id: -1,
        name: "root",
        account: "root",
        avatar: "",
      },
      PostUser: {
        id: 1,
        name: "Hello",
        account: "Word",
      },
    },
    {
      id: 4,
      createdAt: "2022-05-12T08:38:46.106Z",
      updatedAt: "2022-05-12T08:38:46.106Z",
      comment:
        "quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis",
      ReplyUser: {
        id: -1,
        name: "root",
        account: "root",
        avatar: "",
      },
      PostUser: {
        id: 1,
        name: "Hello",
        account: "Word",
      },
    },
  ],
};

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
    };
  },
  methods: {
    fetchPost() {
      this.post = {...dummyData.tweet}
    },
    fetchReplies() {
      this.replies = [...dummyData.replies];
    },
  },
  created() {
    this.fetchPost();
    this.fetchReplies();
  },
};
</script>

<style lang="scss" scoped>
.main {
  @extend %main-container_;
}
</style>