<template>
  <div class="container">
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
        <ul class="follow__tab">
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
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PopularUsers from '../components/PopularUsers.vue'
import PersonalPageHeader from '../components/PersonalPageHeader.vue'
import usersAPI from '../apis/users'

export default {
  name: 'FollowPage',
  components: {
    SideBar,
    PopularUsers,
    PersonalPageHeader,
  },
  data () {
    return {
      user: {},
    }
  },
  methods: {
    async fetchUser ( id ) {
      try {
        const { data } = await usersAPI.getUser( { id })
        this.user = data
      } catch (error) {
        console.log(error)
      }
    },
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
  padding: 0;
  &__tab {
    @extend %tab-style;
    height: 52px;
    border-bottom: 1px solid $color-tab-line;
  }
}
</style>