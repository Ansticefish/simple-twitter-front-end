<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="col-lg-7 col-xl-7">
        <PersonalPageHeader />
        <!-- header need props 'user' -->
        <router-view />
        <!-- Two sub-pages -->
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
import PersonalPageHeader from '../components/PersonalPageHeader.vue'
// import usersAPI from '../apis/users'

export default {
  name: 'FollowPage',
  components: {
    SideBar,
    PopularUsers,
    PersonalPageHeader,
  },
  // methods: {
  //   fetchUser () {
  //     // get user account from params
  //     // get user id 
  //     // get followings and followers list
  //   }
  // },
  // async created () {
  //   const userAccount = this.$route.params
  //   const { data } = await usersAPI.
  // }
}
</script>

<style lang="scss" scoped>
  
</style>