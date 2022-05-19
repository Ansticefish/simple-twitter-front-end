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
              { active: currentPage === 'home' },
            ]"
          ></div>
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="sidebar__upper__menu__item">
          <div
            :class="[
              'menu__item__person-icon',
              {
                active: currentPage === 'personal',
              },
            ]"
          ></div>
          <router-link
            :to="{
              name: 'personal-page-root',
              params: { id: currentUser.id },
            }"
            >個人資料</router-link
          >
        </li>
        <li class="sidebar__upper__menu__item">
          <div
            :class="[
              'menu__item__set-icon',
              { active: currentPage === 'setting' },
            ]"
          ></div>
          <router-link
            :to="{
              name: 'setting-page',
              params: { id: currentUser.id },
            }"
            >設定</router-link
          >
        </li>
      </ul>
      <button 
        @click="openCreateModal"
        class="sidebar__upper__tweet mt-2">推文</button>
    </div>
    <button @click="logout" class="sidebar__log-out">
      <div class="sidebar__log-out__icon"></div>
      <span class="sidebar__log-out__span">登出</span>
    </button>
    <div class="modal-backdrop" v-if="openCreate">
      <CreatePostModal
        :currentUser="currentUser"
        :isHome="false"
        @closeCreateModal="closeCreateModal"
        @update-data="updateData"
      />
    </div>
  </div>
</template>

<script>
import CreatePostModal from '../components/CreatePostModal.vue'
import { mapState } from "vuex";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "SideBar",
  components:{
    CreatePostModal
  },
  data(){
    return{
      openCreate: false,
    }
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      Toast.fire({
        title: '已登出',
        html: ToastIcon.blueInformHtml
      })
      this.$router.push("/signIn");
    },
    updateData () {
      this.$router.push('/home')
    },
    openCreateModal () {
      this.openCreate = true
    },
    closeCreateModal () {
      this.openCreate = false
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    currentPage() {
      const routeName = this.$route.name;
      const userId = Number(this.$route.params.id);
      if (routeName === "setting-page") {
        return "setting";
      } else if (
        (routeName.includes("personal") || routeName.includes("follow")) &&
        userId === this.currentUser.id
      ) {
        return "personal";
      } else {
        return "home";
      }
    },
    routeParamsId() {
      return this.route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/sidebar.scss";
@import '../assets/scss/modal.scss';

#sidebar {
  @extend %sidebar-container;
}

.sidebar__upper {
  width: 100%;
  .sidebar__upper__icon {
    @extend %sidebar-icon;
  }
  .sidebar__upper__menu {
    @extend %sidebar-menu;
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
  }
  .sidebar__upper__tweet {
    @include setButton($color-white, $color-brand, 50px, 16px, 8px) {
      width: 100%;
    }
  }
}
.sidebar__log-out {
  @extend %sidebar-logout;
}
.modal-backdrop{
   @extend %modal-backdrop;
}
</style>