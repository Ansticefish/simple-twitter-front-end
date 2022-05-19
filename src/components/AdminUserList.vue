<template>
  <div class="admin-users">
    <div class="admin-users__header">
      <h4>使用者列表</h4>
    </div>
    <div class="admin-users__main row">
      <div 
        v-for="user in users"
        :key="user.id"
        class="admin-users__card m-3 col-3 p-0">
        <img
          :src="user.cover |emptyCover"
          alt=""
          class="admin-users__card__cover"
        />
        <img
          :src="user.avatar | emptyAvatar"
          alt=""
          class="admin-users__card__avatar"
        />
        <div class="admin-users__card__info mb-4">
          <p class="admin-users__card__info__name">{{user.name}}</p>
          <p class="admin-users__card__info__account">{{user.account | accountShow}}</p>
        </div>
        <div class="admin-users__card__level mb-2">
          <div class="tweet-icon"></div>
          <p class="admin-users__card__level__tweets mr-4">{{user.tweetCount | numberTok}}</p>
          <div class="like-icon"></div>
          <p class="admin-users__card__level__likes">{{user.likeCount | numberTok}}</p>
        </div>
        <div class="admin-users__card__follow">
          <p class="admin-users__card__follow__followings mr-2">
            <span>{{user.followingCount}}個</span>跟隨中
          </p>
          <p class="admin-users__card__follow__followers">
            <span>{{user.followerCount}}位</span>跟隨者
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {accountShow, emptyAvatar, emptyCover} from '../utils/mixins'
const dummyData = [
    {
        "id": 21,
        "account": "user1",
        "name": "user1",
        "avatar": "https://i.imgur.com/q6bwDGO.png",
        "cover": "https://source.unsplash.com/1000x200/?nature",
        "role": "",
        "tweetCount": 11,
        "likeCount": 20,
        "followerCount": 4,
        "followingCount": 3
    },
    {
        "id": 22,
        "account": "user2",
        "name": "user2",
        "avatar": "https://i.imgur.com/q6bwDGO.png",
        "cover": "https://source.unsplash.com/1000x200/?nature",
        "role": "",
        "tweetCount": 10,
        "likeCount": 19,
        "followerCount": 6,
        "followingCount": 0
    },
    {
        "id": 23,
        "account": "user2",
        "name": "user2",
        "avatar": "https://i.imgur.com/q6bwDGO.png",
        "cover": "https://source.unsplash.com/1000x200/?nature",
        "role": "",
        "tweetCount": 10,
        "likeCount": 19,
        "followerCount": 6,
        "followingCount": 0
    },
    {
        "id": 24,
        "account": "user2",
        "name": "user2",
        "avatar": "https://i.imgur.com/q6bwDGO.png",
        "cover": "https://source.unsplash.com/1000x200/?nature",
        "role": "",
        "tweetCount": 10,
        "likeCount": 19,
        "followerCount": 6,
        "followingCount": 0
    },
    {
        "id": 25,
        "account": "user2",
        "name": "user2",
        "avatar": "https://i.imgur.com/q6bwDGO.png",
        "cover": "https://source.unsplash.com/1000x200/?nature",
        "role": "",
        "tweetCount": 10,
        "likeCount": 19,
        "followerCount": 6,
        "followingCount": 0
    },
]

export default {
  name: "AdminUserList",
  mixins:[accountShow, emptyAvatar, emptyCover],
  data(){
    return{
      users: []
    }
  },
  methods:{
    fetchUsers(){
      //api here
      this.users = [...dummyData]
    }
  },
  filters:{
    numberTok(number){
      return number > 1000 ? `${number/1000}k` : number
    }
  },
  created(){
    this.fetchUsers()
  }
};
</script>

<style lang="scss" scoped>
%card-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.admin-users {
  position: fixed;
  background: $color-white;
  &__header {
    @extend %header_;
  }
  &__card {
    position: relative;
    height: 315px;
    width: 250px;
    border-radius: 10px;
    background: #F6F7F8;
    &__cover {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 10px 10px 0 0;
    }
    &__avatar {
      position: absolute;
      top: 64px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      border: 4px solid $color-white;
    }
    &__info {
      margin-top: 2rem;
      flex-direction: column;
      @extend %card-center;
      &__name {
        @extend %name_;
      }
      &__account {
        @extend %account_;
      }
    }
    &__level {
      @extend %card-center;
      .tweet-icon {
        @include setIcon(24px, 22px, $icon-tweet, $icon-tweet){
          margin-right: 8px;
        }
      }
      .like-icon {
        @include setIcon(20px, 19px, $icon-heart, $icon-heart){
          margin-right: 8px;
        }
      }
    }
    &__follow {
      @extend %card-center;
      p {
        @extend %account_;
        span {
          font-size: 14px;
          color: $color-black;
        }
      }
    }
  }
}
</style>