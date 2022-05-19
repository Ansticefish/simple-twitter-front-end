<template>
<div>
  <Spinner v-if="isLoading"/>
  <div class="container" v-show="!isLoading">
    <div class="row">
      <div 
        class="col-lg-2 
        col-xl-2"
      >
        <SideBar />
      </div>
      <div 
        class="
        follow
        col-lg-7 col-xl-7"
      >
        <PersonalPageHeader 
         :user="user"/>
        <FollowTab
        />
        <FollowUsers 
         :user="user"
         :initial-list="followList"
        />
      </div>
      <div 
       class="col-lg-3 
       col-xl-3"
      >
        <PopularUsers />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PopularUsers from '../components/PopularUsers.vue'
import PersonalPageHeader from '../components/PersonalPageHeader.vue'
import FollowTab from '../components/FollowTab.vue'
import FollowUsers from '../components/FollowUsers.vue'
import usersAPI from '../apis/users'
import { Toast, ToastIcon } from '../utils/helpers'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'FollowingsPage',
  components: {
    SideBar,
    PopularUsers,
    PersonalPageHeader,
    FollowTab,
    FollowUsers,
    Spinner,
  },
  data () {
    return {
      user: {},
      followList: [],
      isLoading: true
    }
  },
  methods: {
    async fetchUser ( id ) {
      try {
        const { data } = await usersAPI.getUser( { id })
        this.user = data
      } catch (error) {
        const errorMsg = error.response.data.message
        if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        }
      }
    },
    async fetchFollowings ( id ) {
      try {
        const { data } = await usersAPI.userFollowings( id )

        if (data.message === '沒有追隨者名單'){
          this.followList = []
        } else {
          this.followList = data 
        }
        
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
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser ( id )
    this.fetchFollowings ( id )
  }
}
</script>

<style lang="scss" scoped>
.follow {
  @extend %main-container_;
}
</style>