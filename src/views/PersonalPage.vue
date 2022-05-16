<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="main col-lg-7 col-xl-7 p-0">
          <PersonalPageHeader :user="user" />
          <PersonalInfo 
            :initial-user="user"
            @edit="handleEdit"/>
          <PersonalPageTabs :user-account="user.account"/>
          <router-view :replies="replies"/>
          <!--Three sub-pages -->
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers />
      </div>
    </div>
    <EditPersonalInfo 
      v-if="isEditing"
      @cancelEdit= 'handleCancelEdit'
      @saveEdit = 'handleSaveEdit'
      :initial-user="user" />
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import PersonalPageHeader from "../components/PersonalPageHeader.vue";
import PersonalInfo from "../components/PersonalInfo.vue";
import EditPersonalInfo from "../components/EditPersonalInfo.vue";
import PersonalPageTabs from "../components/PersonalPageTabs.vue";

const dummyData = {
  user: {
    id: -1,
    account: "root",
    name: "root",
    avatar: "",
    introduction:
      "enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla",
    following_count: 30,
    follower_count: 20,
    cover: "",
    isFollowed: false,
  },
  replies: [
    {
      id: 1,
      createdAt: "2022-05-14T08:38:46.106Z",
      updatedAt: "2022-05-15T08:38:46.106Z",
      comment: "vel pharetra vel turpis nunc eget lorem dolor sed viverra",
      post_user: {
        id: -1,
        name: "root",
        account: "root",
      },
      reply_user: {
        id: 2,
        name: "Alan",
        account: "Feiwang",
        avatar: "",
      },
    },
    {
      id: 2,
      createdAt: "2022-05-14T08:38:46.106Z",
      updatedAt: "2022-05-15T08:38:46.106Z",
      comment:
        "enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra magna ac",
      post_user: {
        id: -1,
        name: "root",
        account: "root",
      },
      reply_user: {
        id: 5,
        name: "Michael",
        account: "Tucker",
        avatar: "",
      },
    },
    {
      id: 3,
      createdAt: "2022-05-13T08:38:46.106Z",
      updatedAt: "2022-05-14T08:38:46.106Z",
      comment:
        "risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec",
      post_user: {
        id: -1,
        name: "root",
        account: "root",
      },
      reply_user: {
        id: 3,
        name: "Clara",
        account: "Howell",
        avatar: "",
      },
    },
    {
      id: 4,
      createdAt: "2022-05-12T08:38:46.106Z",
      updatedAt: "2022-05-12T08:38:46.106Z",
      comment:
        "quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis",
      post_user: {
        id: -1,
        name: "root",
        account: "root",
      },
      reply_user: {
        id: 4,
        name: "Karen",
        account: "Kurtz",
        avatar: "",
      },
    },
  ],
};


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
        following_count: 0,
        follower_count: 0,
        cover: "",
        isFollowed: false,
      },
      replies:[],
      isEditing: false,
      
      // undevelop function
      Undevelop: {
        isAlert: false,
      },
    };
  },
  methods: {
    fetchUser() {
      // get user api here
      this.user = { ...dummyData.user };
    },
    fectchReplies() {
      // api here
      this.replies = [...dummyData.replies];
    },
    handleEdit(){
      this.isEditing = true
    },
    handleCancelEdit(){
      this.isEditing = false
    },
    handleSaveEdit(){

    }
  },
  created(){
    this.fetchUser()
    this.fectchReplies()
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  border-left: 1px solid $color-tab-line;
  border-right: 1px solid $color-tab-line;
  overflow-y: scroll;
}

// test
d-none{
  display: none;
}
</style>