<template>
  <div id="sidebar">
    <div class="sidebar__upper">
      <!-- <h1>sidebar</h1> -->
      <div class="sidebar__upper__icon">
        <img src="../assets/icons/Icon.png" alt="icon" />
      </div>
      <ul class="sidebar__upper__menu mt-3">
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
        </li>
      </ul>
      <button class="sidebar__upper__tweet mt-2">推文</button>
    </div>
    <button class="sidebar__log-out">
      <div class="log-out__icon"></div>
      <span class="log-out__span">登出</span>
    </button>
  </div>
</template>

<script>

export default {
  name: "SideBar",
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
    .sidebar__upper__menu__item{
      padding: 1rem 0;
      display: flex;
      align-content: center;
      .menu__item__home-icon{
        @include setIcon(22px, 20px, $icon-home, $icon-home-active);
      }
      .menu__item__person-icon{
        margin-left: 2px;
        @include setIcon(17px, 20px, $icon-person, $icon-person-active);
      }
      .menu__item__set-icon{
        @include setIcon(20px, 20px, $icon-setting, $icon-setting-active);
      }
      a{
        font-weight: bold;
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
  .sidebar__upper__tweet{
        @include setButton($color-white, $color-brand, 50px, 16px, 8px){
          width: 100%;
        }
      }
}
.sidebar__log-out{
  display: flex;
  align-content: center;
  .log-out__icon{
    @include setIcon(18px, 18px, url("../assets/icons/log-out.png"), url("../assets/icons/log-out.png"));
  }
  .log-out__span{
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
  }

}
</style>