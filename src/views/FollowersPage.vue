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
  name: 'FollowersPage',
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
    async fetchFollowers ( id ) {
      try {
        const { data } = await usersAPI.userFollowers( id )
        this.followList = data

        if (data.message === '沒有粉絲名單'){
          this.followList = []
        } else {
          this.followList = data 
        }

        this.isLoading = false
     
      } catch (error) {
        const errorMsg = error.response.data.message
        if (errorMsg === "Error:該名使用者沒有被任何人追蹤！"){
          Toast.fire({
            title: '尚無追隨者',
            html: ToastIcon.yellowWarningHtml
          })
        } else if( errorMsg ) {
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
    this.fetchFollowers ( id )
  },
}
</script>

<style lang="scss" scoped>
.follow {
  @extend %main-container_;
  &__tab {
    @extend %tab-style;
    height: 52px;
    border-bottom: 1px solid $color-tab-line;
  }
}
</style>