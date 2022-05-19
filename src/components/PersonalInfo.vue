<template>
  <div id="personal-info" class="personal mb-3">
    <div class="personal__cover">
      <img :src="user.cover | emptyCover" alt="" />
    </div>
    <div class="personal__avatar">
      <img :src="user.avatar | emptyAvatar" alt="" />
    </div>
    <button 
      v-if="user.id === currentUser.id" 
      @click.prevent.stop="edit"
      class="personal__edit-btn">
      編輯個人資料
    </button>
    <div v-else class="personal__buttons">
      <button class="personal__buttons__mail">
        <div class="mail__icon"></div>
      </button>
      <button
        @click.prevent.stop="toggleAlert"
        :class="['personal__buttons__alert', { active: Undevelop.isAlert }]"
      >
        <div :class="['alert__icon', { active: Undevelop.isAlert }]"></div>
      </button>
      <button
        v-if="user.isFollowed"
        @click.prevent.stop="unfollow()"
        class="personal__buttons__follow active"
      >
        正在跟隨
      </button>
      <button
        v-else
        @click.prevent.stop="follow()"
        class="personal__buttons__follow"
      >
        跟隨
      </button>
    </div>
    <div class="personal__info">
      <h5 class="personal__info__name">{{ user.name }}</h5>
      <p class="personal__info__account mb-1">
        {{ user.account | accountShow }}
      </p>
      <p class="personal__info__descript">{{ user.introduction }}</p>
      <div class="personal__info__follow mt-1">
        <router-link
          :to="{
            name: 'follow-page-following',
            parmas: user.account,
          }"
          class="personal__info__following mr-4"
          ><strong>{{ user.followingCount }} 個</strong>跟隨中</router-link
        >
        <router-link
          :to="{
            name: 'follow-page-followers',
            parmas: user.account,
          }"
          class="personal__info__follower"
          ><strong>{{ user.followerCount }} 位</strong>跟隨者</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { accountShow, emptyAvatar, emptyCover } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [accountShow, emptyAvatar, emptyCover],
  name: "PersonalInfo",
  props: {
    initialUser: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        name: "",
        avatar: "",
        introduction: "",
        followingCount: 0,
        followerCount: 0,
        cover: "",
        isFollowed: false,
      },
      // undevelop function
      Undevelop: {
        isAlert: false,
      },
    };
  },
  methods: {
    fetchUser() {
      // get user api here
      this.user = { ...this.initialUser };
    },
    follow() {
      // api here
      this.user.isFollowed = true;
    },
    unfollow() {
      // api here
      this.user.isFollowed = false;
    },
    edit(){
      this.$emit('edit')
    },

    // function undeveloped
    toggleAlert() {
      this.Undevelop.isAlert = !this.Undevelop.isAlert;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch:{
    initialUser(){
      this.fetchUser()
    }
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style lang="scss" scoped>
.personal {
  position: relative;
  width: 100%;
  &__cover {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
  &__avatar {
    position: absolute;
    top: 135px;
    left: 1rem;
    img {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border: 4px solid $color-white;
      border-radius: 50%;
    }
  }
  &__info {
    margin: 78px 1rem 0;
    &__name {
      line-height: 26px;
    }
    &__account,
    &__follow a {
      color: $color-secondary;
      strong {
        font-weight: 400;
        color: $color-black;
        font-size: $font-size-secondary;
      }
    }
    &__account,
    &__descript,
    &__follow a {
      line-height: 22px;
      font-size: $font-size-secondary;
    }
  }
  &__edit-btn,
  &__buttons {
    position: absolute;
    top: calc(200px + 1rem);
    right: 1rem;
  }
  &__edit-btn {
    @include setButton($color-brand, transparent, 50px, 16px, 8px);
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__follow {
      @include setButton($color-brand, transparent, 50px, 16px, 8px);
      &.active {
        color: $color-white;
        background: $color-brand;
      }
    }
    &__mail,
    &__alert {
      margin-right: 1rem;
      padding-top: 5px;
      width: 40px;
      height: 40px;
      border: 1px solid $color-brand;
      border-radius: 50%;
      &.active {
        background: $color-brand;
      }
    }
    .mail__icon {
      @include setIcon(
        20px,
        18px,
        url("../assets/icons/mail-trans.png"),
        url("../assets/icons/mail-trans.png")
      ) {
        margin: auto;
      }
    }
    .alert__icon {
      margin: auto;
      @include setIcon(
        24px,
        23px,
        url("../assets/icons/bell-trans.png"),
        url("../assets/icons/bell.png")
      ) {
        margin: auto;
      }
    }
  }
}
</style>