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
              class="list__card__avatar"
              :src="user.avatar | emptyAvatar"
              alt=""
            />
            <div class="list__card__info">
              <p class="list__card__info__name">{{ user.name }}</p>
              <p class="list__card__info__account">{{ user.account }}</p>
            </div>
          </div>
          <button
          @click.prevent.stop ="unfollow(user.id)"
            v-show="user.isFollowed"
            class="list__card__follow-btn active"
          >
            正在跟隨
          </button>
          
          <button 
            @click.prevent.stop ="follow(user.id)"
            v-show="!user.isFollowed" class="list__card__follow-btn">
            跟隨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emptyAvatar from "../assets/icons/avatar-empty.png"
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
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fecthUsers() {
      this.users = [...dummyData.users];
    },
    follow(userId){
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: true
          }
        }else{
          return {...user}
        }
      })
    },
    unfollow(userId){
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: false
          }
        }else{
          return {...user}
        }
      })
    }
  },
  filters:{
    emptyAvatar(imgURL){
      return imgURL? imgURL: emptyAvatar
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
          width: 50px;
          height: 50px;
          object-fit: cover;
        }
        &__info {
          &__name {
            line-height: 26px;
            font-weight: bold;
          }
          &__account {
            line-height: 22px;
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