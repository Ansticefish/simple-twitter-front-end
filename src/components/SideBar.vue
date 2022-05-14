<template>
  <div id="sidebar">
    <div class="sidebar__upper">
      <div class="sidebar__upper__icon">
        <img src="../assets/icons/Icon.png" alt="icon" />
      </div>
      <ul class="sidebar__upper__menu mt-3">
        <li class="sidebar__upper__menu__item">
          <div
            :class="[
              'menu__item__home-icon',
              { active: this.$route.name === 'home-page' },
            ]"
          ></div>
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="sidebar__upper__menu__item">
          <div
            :class="[
              'menu__item__person-icon',
              { active: this.$route.path.includes('/users') },
            ]"
          ></div>
          <router-link
            :to="{
              name: 'personal-page-root',
              params: { userAccount: currentUser.account },
            }"
            >個人資料</router-link
          >
        </li>
        <li class="sidebar__upper__menu__item">
          <div
            :class="[
              'menu__item__set-icon',
              { active: this.$route.name === 'setting-page' },
            ]"
          ></div>
          <router-link
            :to="{
              name: 'setting-page',
              params: { userAccount: currentUser.account },
            }"
            >設定</router-link
          >
        </li>
      </ul>
      <button class="sidebar__upper__tweet mt-2">推文</button>
    </div>
    <button
      @click="logout"
      class="sidebar__log-out">
      <div class="sidebar__log-out__icon"></div>
      <span class="sidebar__log-out__span">登出</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "SideBar",
  methods: {
    postTweet() {
      // function here
    },
    logout(){
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signIn')
    }
  },
  computed:{
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.fetchCurrentUser();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/sidebar.scss";

.menu__item {
  &__home-icon {
    @include setIcon(20px, 20px, $icon-home, $icon-home-active);
  }
  &__person-icon {
    margin-left: 2px;
    @include setIcon(20px, 20px, $icon-person, $icon-person-active);
  }
  &__set-icon {
    @include setIcon(20px, 20px, $icon-setting, $icon-setting-active);
  }
}

</style>