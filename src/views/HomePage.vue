<template>
<div>
  <Spinner v-if="isLoading" />
  <div v-if="!isLoading" class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar
        @update="fetchPosts"
        />
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
</div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PopularUsers from '../components/PopularUsers.vue'
import CreatePostModal from '../components/CreatePostModal.vue'
import PostBlockShort from '../components/PostBlockShort.vue'
import { mapState } from 'vuex'
import postsAPI from '../apis/posts'
import { Toast, ToastIcon } from '../utils/helpers'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'HomePage',
  components: {
    SideBar,
    PopularUsers,
    CreatePostModal,
    PostBlockShort,
    Spinner
  },
  data () {
    return {
      openCreate: false, 
      posts: [],
      isLoading: true,
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
         this.isLoading = false
      } catch (error) {
        const errorMsg = error.response.data.message
        if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        }

        this.isLoading = false
      }
    },
    updateData () {
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
 @extend %main-container_;
  &__header {
    @extend %header_;
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