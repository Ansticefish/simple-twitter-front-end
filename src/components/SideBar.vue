<template>
  <div id="sidebar">
    <div class="sidebar__upper">
      <!-- <h1>sidebar</h1> -->
      <div class="sidebar__upper__icon">
        <img src="../assets/icons/Icon.png" alt="icon" />
      </div>
      <ul class="sidebar__upper__menu mt-3">
<<<<<<< HEAD
        <!-- router-link need to be set -->
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
=======
        <!-- router to need to be set -->
        <li class="sidebar__upper__menu__item">
          <div class="menu__item__home-icon"></div>
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="sidebar__upper__menu__item">
          <div class="menu__item__person-icon"></div>
          <router-link to="/home">個人資料</router-link>
        </li>
        <li class="sidebar__upper__menu__item">
          <div class="menu__item__set-icon"></div>
          <router-link to="/home">設定</router-link>
>>>>>>> b12f7b4 (side bar style , tune variables)
        </li>
      </ul>
      <button class="sidebar__upper__tweet mt-2">推文</button>
    </div>
    <button class="sidebar__log-out">
<<<<<<< HEAD
      <div class="sidebar__log-out__icon"></div>
      <span class="sidebar__log-out__span">登出</span>
=======
      <div class="log-out__icon"></div>
      <span class="log-out__span">登出</span>
>>>>>>> b12f7b4 (side bar style , tune variables)
    </button>
  </div>
</template>

<script>
<<<<<<< HEAD
const dummyCurrentUser = {
  currentUser: {
    id: 1,
    account: "user",
    name: "user",
    email: "user@email.com",
    role: "",
  },
  isAuthenticated: true,
};

export default {
  name: "SideBar",
  data() {
    return {
      currentUser: {
        id: 1,
        account: "",
        name: "",
        email: "",
        role: "",
      },
      isAuthenticated: false,
    };
  },
  methods: {
    fetchCurrentUser() {
      // 1. get current user api here
      // 2. use store instead
      this.currentUser = {
        ...dummyCurrentUser.currentUser,
      };
      this.isAuthenticated = dummyCurrentUser.isAuthenticated;
    },
    postTweet() {
      // function here
    },
  },
  created() {
    this.fetchCurrentUser();
  },
=======

export default {
  name: "SideBar",
>>>>>>> b12f7b4 (side bar style , tune variables)
};
</script>

<style lang="scss">
#sidebar {
  padding: 1rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.sidebar__upper {
  width: 100%;
  .sidebar__upper__icon {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .sidebar__upper__menu {
    &__item {
      padding: 1rem 0;
      display: flex;
      align-content: center;
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
      a {
        font-weight: bold;
        font-size: 18px;
        line-height: 20px;
      }
      .active + a {
        color: $color-brand;
      }
    }
  }
  .sidebar__upper__tweet {
    @include setButton($color-white, $color-brand, 50px, 16px, 8px) {
      width: 100%;
    }
  }
}
.sidebar__log-out {
  display: flex;
  align-content: center;
  &__icon {
    @include setIcon(
      18px,
      18px,
      url("../assets/icons/log-out.png"),
      url("../assets/icons/log-out.png")
    );
  }
  &__span {
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
  }
  &:hover {
    opacity: 0.6;
  }
}
</style>