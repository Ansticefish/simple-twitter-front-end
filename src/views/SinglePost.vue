<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="col-lg-7 col-xl-7">
        <PostBlockFull />
        <ReplyBlock />
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
import PostBlockFull from '../components/PostBlockFull.vue'
import ReplyBlock from '../components/ReplyBlock.vue'
import CreateReplyModal from '../components/CreateReplyModal.vue'


export default {
    name: "SinglePost",
    components: {
      SideBar,
      PopularUsers,
      PostBlockFull,
      ReplyBlock,
      CreateReplyModal,
    }
}
</script>

<style lang="scss" scoped>
  
</style>