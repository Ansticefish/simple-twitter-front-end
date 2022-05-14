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
              { active: this.$route.name === 'admin-posts' },
            ]"
          ></div>
          <router-link to="/admin/posts">推文清單</router-link>
        </li>
        <li class="sidebar__upper__menu__item">
          <div
            :class="[
              'menu__item__person-icon',
              { active: this.$route.name === 'admin-users' },
            ]"
          ></div>
          <router-link to="/admin/users">使用者列表</router-link>
        </li>
      </ul>
      <button class="sidebar__upper__tweet mt-2">推文</button>
    </div>
    <button class="sidebar__log-out">
      <div class="sidebar__log-out__icon"></div>
      <span class="sidebar__log-out__span">登出</span>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SideBar",
  methods: {
    postTweet() {
      // function here
    },
  },
  computed:{
    ...mapState(['currentUser','isAuthenticated'])
  },
  created() {
    this.fetchCurrentUser();
  },
};
</script>

<style lang="scss" >
@import "../assets/scss/sidebar.scss";

.menu__item {
  &__home-icon {
    @include setIcon(20px, 20px, $icon-home, $icon-home-active);
  }
  &__person-icon {
    margin-left: 2px;
    @include setIcon(20px, 20px, $icon-person, $icon-person-active);
  }
}
</style>