<template>
  <div class="admin-users">
    <div class="admin-users__header">
      <h4>使用者列表</h4>
    </div>
    <div class="admin-users__main row m-0">
      <div 
        v-for="user in users"
        :key="user.id"
        class="admin-users__card col-3 mt-3 ml-3 p-0">
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
import { Toast, ToastIcon } from "../utils/helpers";
import adminAPI from '../apis/admin'

export default {
  name: "AdminUserList",
  mixins:[accountShow, emptyAvatar, emptyCover],
  data(){
    return{
      users: []
    }
  },
  methods:{
    async fetchUsers(){
      try{
        const {data} = await adminAPI.getUsers()
        this.users = [...data]
      }catch(err){
        console.log(err)
        Toast.fire({
          title:'無法取得使用者資料',
          html: ToastIcon.redCrossHtml
        })
      }
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
        &:hover{
          cursor: default;
          text-decoration: none;
        }
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
          &:hover{
            cursor: default;
          }
        }
      }
      .like-icon {
        @include setIcon(20px, 19px, $icon-heart, $icon-heart){
          margin-right: 8px;
          &:hover{
            cursor: default;
          }
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