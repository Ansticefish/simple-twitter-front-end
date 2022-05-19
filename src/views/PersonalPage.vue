<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="main col-lg-7 col-xl-7 p-0">
        <PersonalPageHeader :user="user" />
        <PersonalInfo
          v-show="!isLoadingInfo"
          :initial-user="user"
          @edit="handleEdit"
        />
        <PersonalPageTabs :user-account="user.account" />
        <router-view
          v-show="!isLoadingRouter"
          :initialPosts="posts"
          :replies="replies"
        />
        <!--Three sub-pages -->
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers />
      </div>
    </div>
    <EditPersonalInfo
      v-if="isEditing"
      @cancelEdit="handleCancelEdit"
      @saveEdit="handleSaveEdit"
      :initial-user="user"
    />
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import PersonalPageHeader from "../components/PersonalPageHeader.vue";
import PersonalInfo from "../components/PersonalInfo.vue";
import EditPersonalInfo from "../components/EditPersonalInfo.vue";
import PersonalPageTabs from "../components/PersonalPageTabs.vue";

import userAPI from "../apis/users";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "PersonalPage",
  components: {
    SideBar,
    PopularUsers,
    PersonalInfo,
    EditPersonalInfo,
    PersonalPageTabs,
    PersonalPageHeader,
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        name: "",
        avatar: "",
        introduction: "",
        followingCount: 0,
        followerCount: 0,
        cover: "",
        isFollowed: false,
        tweetCount: 0,
      },
      replies: [],
      posts: [],
      isEditing: false,
      isLoadingInfo: true,
      isLoadingRouter: true,

      // undevelop function
      Undevelop: {
        isAlert: false,
      },
    };
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoadingInfo = true;
        const { data } = await userAPI.getUser({ id: userId });
        this.user = { ...data };
        this.isLoadingInfo = false;
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取得使用者資料",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    async fectchReplies(userId) {
      try {
        this.isLoadingRouter = true;
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
        this.isLoadingRouter = false;
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取得使用者回覆",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    async fectchPosts(userId) {
      try {
        this.isLoadingRouter = true;
        if (this.$route.name === "personal-page-liked") {
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
          this.isLoadingRouter = false;
        } else {
          const { data } = await userAPI.getUserPosts(userId);
          if (!data.message) {
            this.posts = [...data];
            this.user.postCount = data.length
          } else {
            this.posts = [];
            Toast.fire({
              title: "使用者尚無推文",
              html: ToastIcon.blueInformHtml,
            });
          }
          this.isLoadingRouter = false;
        }
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取得使用者推文",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    handleEdit() {
      this.isEditing = true;
    },
    handleCancelEdit() {
      this.isEditing = false;
    },
    handleSaveEdit(userEdited) {
      const { name, avatar, cover, introduction } = userEdited;
      this.user = {
        ...this.user,
        name,
        avatar,
        cover,
        introduction,
      };
      this.isEditing = false;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
    this.fectchReplies(id);
    this.fectchPosts(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    if (id !== from.params.id) {
      this.fetchUser(id);
    }
    this.fectchReplies(id);
    this.fectchPosts(id);
    next();
  },
};
</script>

<style lang="scss" scoped>
.main {
  @extend %main-container_;
}
</style>