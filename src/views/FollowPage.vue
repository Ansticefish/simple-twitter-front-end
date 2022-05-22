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
        <FollowTab />
        <!-- Render two sub pages -->
        <router-view 
        :user="user"
        :rerender-list="rerenderList"
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
    Spinner,
  },
  data () {
    return {
      user: {},
      updateList: 0,
      rerenderList: 0,
      isLoading: true
    }
  },
  methods: {
    async fetchUser ( id ) {
      try {
        const { data } = await usersAPI.getUser( { id })
        this.user = data
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
      }
    },
    updateTop () {
      this.updateList += 1
    },
    rerender ( ){
      this.rerenderList += 1
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser ( id )
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