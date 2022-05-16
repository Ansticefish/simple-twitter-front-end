<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar/>
      </div>
      <div 
        class="
        home
        col-lg-7 
        col-xl-7"
      >  
        <div 
        class="home__header"
        >
          <h4>首頁</h4>
        </div>
        <div 
          class="home__createPost"
          @click="openCreateModal">
          <CreatePostModal 
          :currentUser="currentUser"
          :isHome="true"/>
        </div> 
        <!-- Render Posts -->
        <PostBlockShort
         v-for="post in posts"
         :key="post.id"
         :post="post" 
        />
      </div>
      <div 
       class="
       col-lg-3 
       col-xl-3"
       >
        <PopularUsers /> 
      </div>
      <!-- Modals -->
      <div 
        class="modal-backdrop" 
        v-if="openCreate"
      >
        <CreatePostModal
        :currentUser="currentUser" 
        :isHome="false"
        @closeCreateModal="closeCreateModal"/>  
      </div>
    </div> 
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PopularUsers from '../components/PopularUsers.vue'
import CreatePostModal from '../components/CreatePostModal.vue'
import PostBlockShort from '../components/PostBlockShort.vue'
import { mapState } from 'vuex'

const dummyPosts = [
  {
    id: 1,
    description: 'hihihihihi',
    user: {
      id: 6,
      account: 'test5',
      name: 'test5',
      avatar: null,
    },
    createdAt: 2020/10/3,
    replyCount: 55,
    likeCount: 60,
    isLiked: true
  },
  {
    id: 2,
    description: 'hihihihihihihihihihihihihihihi 55555555555555555555555555   55555555555555555555555555  555555555555555',
    user: {
      id: 6,
      account: 'test4',
      name: 'test4',
      avatar: null,
    },
    createdAt: 2020/10/3,
    replyCount: 55,
    likeCount: 60,
    isLiked: true
  },
  {
    id: 3,
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma',
    user: {
      id: 6,
      account: 'test3',
      name: 'test3',
      avatar: null,
    },
    createdAt: 2020/10/3,
    replyCount: 55,
    likeCount: 60,
    isLiked: true
  },
  {
    id: 4,
    description: 'no no no no no ',
    user: {
      id: 6,
      account: 'test2',
      name: 'test2',
      avatar: null,
    },
    createdAt: 2020/10/3,
    replyCount: 55,
    likeCount: 60,
    isLiked: true
  },
  {
    id: 5,
    description: '555 66666 666',
    user: {
      id: 6,
      account: 'test1',
      name: 'test1',
      avatar: null,
    },
    createdAt: 2020/10/3,
    replyCount: 55,
    likeCount: 60,
    isLiked: true
  }
]



export default {
  name: 'HomePage',
  components: {
    SideBar,
    PopularUsers,
    CreatePostModal,
    PostBlockShort,
  },
  data () {
    return {
      openCreate: false, 
      posts: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchPosts () {
      // Add API
      this.posts = dummyPosts
    },
    openCreateModal () {
      this.openCreate = true
    },
    closeCreateModal () {
      this.openCreate = false
    },
  },
  created () {
    this.fetchPosts ()
  }
}
</script>

<style lang="scss" scoped>  
@import '../assets/scss/modal.scss';

.home {
  height: 100vh;
  overflow-y: auto;
  padding: 0px;
  border-right: 1px solid $color-tab-line;
  border-left: 1px solid $color-tab-line;
  &__header {
    width: 100%;
    height: 74px;
    border-bottom: 1px solid $color-tab-line;
    h4 {
      margin-left: 24px;
      line-height: 74px;
    }
  }
  &__createPost {
      width: 100%;
      height: 146px;
      padding: 0;
      border-bottom: 10px solid $color-tab-line;
      cursor: pointer;
    }
}


.popular-users {
  position: absolute;
}
.modal-backdrop {
    @extend %modal-backdrop;
}


</style>