<template>
  <div class="container">
     <Spinner v-if='isLoading && !isRendering' />
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="main col-lg-7 col-xl-7 p-0">
        <PersonalPageHeader :user="user" />
        <PersonalInfo
          v-show="!isLoading || isRendering"
          :initial-user="user"
          @edit="handleEdit"
          @updateFollowStatus="updateTop"
        />
        <PersonalPageTabs :user-account="user.account" />
        <!--Three sub-pages -->
        <router-view />
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers 
          :updateList="updateList"
          @rerender="rerender"/>
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

import Spinner from '../components/Spinner.vue'
import userAPI from "../apis/users";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "PersonalPage",
  components: {
    Spinner,
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
      isLoading: true,
      isEditing: false,
      isRendering: false,
      updateList: 0,

      // undevelop function
      Undevelop: {
        isAlert: false,
      },
    };
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.getUser({ id: userId });
        this.user = { ...data };
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取得使用者資料",
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
    updateTop () {
      this.updateList -= 1
    },
    async rerender(){
      this.isRendering = true
      const { id } = this.$route.params;
      await this.fetchUser(id)
      this.isRendering = false
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    if (id !== from.params.id) {
      this.fetchUser(id);
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.main {
  @extend %main-container_;
}
</style>