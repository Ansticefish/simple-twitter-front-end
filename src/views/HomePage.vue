<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="col-lg-7 col-xl-7">
        <CreatePostModal />
        <CreatePostModal />
        <PostBlockShort />
        <CreateReplyModal />
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers /> 
      </div>
    </div> 
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PopularUsers from '../components/PopularUsers.vue'
import CreatePostModal from '../components/CreatePostModal.vue'
import PostBlockShort from '../components/PostBlockShort.vue'
import CreateReplyModal from '../components/CreateReplyModal.vue'

export default {
  name: 'HomePage',
  components: {
    SideBar,
    PopularUsers,
    CreatePostModal,
    PostBlockShort,
    CreateReplyModal,
}
}
</script>

<style lang="scss" scoped>  

</style>