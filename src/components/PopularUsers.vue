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
              @click="getIntoPersonalPage(user.id, user.name)"
              class="list__card__avatar"
              :src="user.avatar | emptyAvatar"
              alt=""
            />
            <div class="list__card__info">
              <p
                @click="getIntoPersonalPage(user.id, user.name)"
                class="list__card__info__name"
              >
                {{ user.name }}
              </p>
              <p class="list__card__info__account">
                {{ user.account | accountShow }}
              </p>
            </div>
          </div>
          <button v-if="currentUser.id === user.id" class="list__card__me-btn">
            我
          </button>
          <button
            v-else-if="user.isFollowed"
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
import { mapState } from "vuex";
import { accountShow, emptyAvatar, getIntoPersonalPage } from "../utils/mixins";
import usersAPI from "../apis/users";
import { Toast, ToastIcon } from "../utils/helpers";

export default {
  name: "PopularUsers",
  props: {
    updateList: {
      type: Number,
      default: 0,
    },
  },
  mixins: [accountShow, emptyAvatar, getIntoPersonalPage],
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fecthUsers() {
      try {
        const { data } = await usersAPI.getUsersTop();
        this.users = [...data];
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法成功取得Top Users",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    async follow(userId) {
      try {
        await usersAPI.followUser(userId);
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
        this.$emit("rerender");
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法成功追蹤使用者",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    async unfollow(userId) {
      try {
        await usersAPI.unfollowUser(userId);
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
        this.$emit("rerender");
      } catch (err) {
        console.log(err);
        Toast.fire({
          title: "無法取消追蹤使用者",
          html: ToastIcon.redCrossHtml,
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fecthUsers();
  },
  watch: {
    updateList: {
      handler: "fecthUsers",
    },
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
    height: calc(100vh - 25px);
    overflow: auto;
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
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &__account {
            @extend %account_;
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            color: $color-gray-6;
          }
        }
        &__me-btn {
          @include setButton($color-secondary, transparent, 50px, 16px, 8px) {
            border-color: $color-secondary;
            &:hover {
              cursor: default;
            }
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