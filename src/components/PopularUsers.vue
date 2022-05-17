<template>
  <div id="popular-users" class="py-3">
    <div class="wrapper">
      <h4 class="popular-users__title p-4">跟隨誰</h4>
      <div class="popular-users__list">
        <div
          v-for="user in users"
          :key="user.id"
          class="popular-users__list__card p-3"
        >
          <div class="list__card">
            <img
              @click="getIntoPersonalPage(user.account)"
              class="list__card__avatar"
              :src="user.avatar | emptyAvatar"
              alt=""
            />
            <div class="list__card__info">
              <p
                @click="getIntoPersonalPage(user.account)"
                class="list__card__info__name"
              >
                {{ user.name }}
              </p>
              <p class="list__card__info__account">
                {{ user.account | accountShow }}
              </p>
            </div>
          </div>
          <button
            v-if="user.isFollowed"
            @click.prevent.stop="unfollow(user.id)"
            class="list__card__follow-btn active"
          >
            正在跟隨
          </button>
          <button
            v-else
            @click.prevent.stop="follow(user.id)"
            class="list__card__follow-btn"
          >
            跟隨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountShow, emptyAvatar } from "../utils/mixins";
const dummyData = {
  users: [
    {
      id: 1,
      account: "Young",
      name: "Duane",
      avatar: "",
      isFollowed: true,
    },
    {
      id: 2,
      account: "Moore",
      name: "Crystal",
      avatar: "",
      isFollowed: false,
    },
    {
      id: 3,
      account: "Uribe",
      name: "Denise",
      avatar: "",
      isFollowed: false,
    },
    {
      id: 4,
      account: "McCleery",
      name: "Felipe",
      avatar: "",
      isFollowed: false,
    },
    {
      id: 5,
      account: "Larry",
      name: "Stanley",
      avatar: "",
      isFollowed: false,
    },
  ],
};
export default {
  name: "PopularUsers",
  mixins: [accountShow, emptyAvatar],
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fecthUsers() {
      // api here
      this.users = [...dummyData.users];
    },
    follow(userId) {
      // api here
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: true,
          };
        } else {
          return { ...user };
        }
      });
    },
    unfollow(userId) {
      // api here
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: false,
          };
        } else {
          return { ...user };
        }
      });
    },
    getIntoPersonalPage(userAccount) {
      if (this.$route.params.userAccount !== userAccount) {
        this.$router.push({
          name: "personal-page-root",
          params: { userAccount: userAccount },
        });
      }
    }
  },
  created() {
    this.fecthUsers();
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 100%;
  border-radius: 1rem;
  background: $color-gray-1;
}
.popular-users {
  &__title {
    width: 100%;
    border-bottom: 1px solid $color-tab-line;
  }
  &__list {
    &__card {
      display: flex;
      justify-content: space-between;
      .list__card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__avatar {
          margin-right: 8px;
          @extend %avatar_;
          &:hover + div .list__card__info__name {
            text-decoration: underline;
          }
        }
        &__info {
          &__name {
            @extend %name_;
          }
          &__account {
            @extend %account_;
            
            font-size: $font-size-secondary;
            color: $color-gray-6;
          }
        }
        &__follow-btn {
          @include setButton($color-brand, transparent, 50px, 16px, 8px);
          &.active {
            color: $color-white;
            background: $color-brand;
          }
        }
      }
    }
  }
}
</style>