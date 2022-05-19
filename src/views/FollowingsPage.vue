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
         @update="updateTop"
        />
      </div>
      <div 
       class="col-lg-3 
       col-xl-3"
      >
        <PopularUsers 
        :updateList="updateList"
         @rerender="rerender"
        />
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
      updateList: 0,
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

        this.followList = data 
        
        this.isLoading = false

      } catch (error) {
        const errorMsg = error.response.data.message
        if (errorMsg === "Error:該名使用者沒有追蹤任何人！"){
          Toast.fire({
            title: '尚無追蹤者',
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
     updateTop () {
      this.updateList += 1
    },
    rerender ( ){
      this.fetchFollowings(this.user.id)
    }
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