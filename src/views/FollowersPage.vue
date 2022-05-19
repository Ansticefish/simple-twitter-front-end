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
         v-show="!isLoading"
         :user="user"/>
        <ul 
         v-show="!isLoading"
         class="follow__tab">
          <li 
          :class="{ 'active': this.$route.name === 'follow-page-followers'}">
            <router-link 
              :to="{ 
              name: 'follow-page-followers',
              params: { id: user.id },
              }"
            >
              追隨者
            </router-link>
          </li>
          <li
            :class="{ 'active': this.$route.name === 'follow-page-following'}"
          >
            <router-link
              :to="{ 
              name: 'follow-page-following',
              params: { id: user.id },
              }"
            >
              正在追蹤
            </router-link>
          </li>
        </ul>
        <router-view 
         :key="$route.fullPath"
         :user="user"
         @loading="changeIsLoading"
        />
        <!-- Two sub-pages -->
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
import usersAPI from '../apis/users'
import { Toast, ToastIcon } from '../utils/helpers'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'FollowersPage',
  components: {
    SideBar,
    PopularUsers,
    PersonalPageHeader,
    Spinner,
  },
  data () {
    return {
      user: {},
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
    changeIsLoading () {
      this.isLoading = false
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser ( id )
  }
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