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
         :initial-posts="posts" 
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
        @closeCreateModal="closeCreateModal"
        @update-data="updateData"
        />  
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
import postsAPI from '../apis/posts'

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
    async fetchPosts () {
      try {
         const { data } = await postsAPI.getPosts()
         this.posts = data
      } catch (error) {
        console.log('error', error)
      }
    },
    updateData () {
      console.log('update')
      this.fetchPosts()
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