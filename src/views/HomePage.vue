<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div 
        class="
        home
        col-lg-7 
        col-xl-7"
      >  
        <div class="home__header">

        </div>
        <div 
          class="home__createPost"
          @click="openCreateModal">
          <CreatePostModal :hideCross="true"/>
        </div>
          
        <PostBlockShort />
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers /> 
      </div>
      <!-- <div class="modal-backdrop">
         <CreateReplyModal />
      </div>  -->
      <div class="modal-backdrop" v-show="openCreate">
        <CreatePostModal 
        :hideCross="false"
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
// import CreateReplyModal from '../components/CreateReplyModal.vue'

export default {
  name: 'HomePage',
  components: {
    SideBar,
    PopularUsers,
    CreatePostModal,
    PostBlockShort,
    // CreateReplyModal,
  },
  data () {
    return {
      openCreate: false
    }
  },
  methods: {
    openCreateModal () {
      this.openCreate = true
    },
    closeCreateModal () {
      this.openCreate = false
    }
  }
}
</script>

<style lang="scss" scoped>  




.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    padding: 56px;
}





</style>