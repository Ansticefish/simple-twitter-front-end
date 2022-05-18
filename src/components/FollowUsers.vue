<template>
<div>
  <div 
    v-for="(follow, index) in followList"
    :key="index"
    class="followBlock">
    <img 
       @click.stop.prevent="toPersonalPage(follow.account)"
      class="followBlock__avatar"
      :src="follow.avatar | emptyAvatar " alt="">
    <div class="followBlock__wrapper">
      <div class="followBlock__wrapper__header">
        <p 
         @click.stop.prevent="toPersonalPage(follow.account)"
         class="followBlock__wrapper__header__name"> 
          {{ follow.name }}
        </p>
        <template v-if="follow.account !== currentUser.account">
          <button
         v-if="follow.isFollowed"
         @click.stop.prevent="removeFollow(follow.account)"
         class="followBlock__wrapper__header__btn--following"
        >
          正在跟隨
        </button>
        <button
        v-else
        @click.stop.prevent="addFollow(follow.account)"
        class="followBlock__wrapper__header__btn--follow"
        >
          跟隨
        </button>
        </template>
      </div>
      <p class="followBlock__wrapper__content">
      {{ follow.introduction}}
      </p>
    </div>
  </div>
</div>  
</template>

<script>
import usersAPI from '../apis/users'
import { Toast, ToastIcon } from '../utils/helpers'
import { mapState } from 'vuex'
import { emptyAvatar } from '../utils/mixins'

export default {
  name: 'FollowUsers',
  props: {
    user:{
      type: Object,
      required: true
    },
  },
  mixins: [ emptyAvatar ],
  data () {
    return {
      followList: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchFollowings ( id ) {
      try {
        const { data } = await usersAPI.userFollowings( id )
        this.followList = data 
      } catch (error) {
        console.log(error)
      }
    },
    async fetchFollowers ( id ) {
      try {
        const { data } = await usersAPI.userFollowers( id )
        this.followList = data
      } catch (error) {
        console.log(error)
      }
    },
    getUserId ( account ) {
       const user =  this.followList.filter( follow => 
          follow.account === account
       )
       const id = user[0].followingId || user[0].followerId
       return id
    },
    toPersonalPage (account) {  
       const id = this.getUserId(account)

       this.$router.push({
          name: "personal-page-root",
          params: { id,},
       });
    },
    async addFollow (account) {
      try {
        const id = this.getUserId(account)

        const response = await usersAPI.followUser(id)
        
        console.log(response)
        this.followList = this.followList.map( follow => {
          if( follow.account === account) {
            return {
              ...follow,
              isFollowed: true
            }
          } else {
            return follow
          }
        })

      } catch (error) {
        const errorMsg = error.response.data.message
        if (errorMsg === 'Error:不能追蹤自己!') {
          Toast.fire({
            title: '不能追蹤自己！',
            html: ToastIcon.redCrossHtml
          }) 
          } else if (errorMsg === 'Error:你已經追蹤該使用者！') {
            Toast.fire({
              title: '已追蹤該使用者',
              html: ToastIcon.yellowWarningHtml
            }) 
        } else { 
          Toast.fire({
            title: '追蹤失敗',
            html: ToastIcon.redCrossHtml
          }) 
        } 
      }
    },
    async removeFollow (account) {
      try {
        const id = this.getUserId(account)

        await usersAPI.unfollowUser(id)

        this.followList = this.followList.map( follow => {
          if( follow.account === account) {
            return {
              ...follow,
              isFollowed: false
            }
          } else {
            return follow
          }
        })

      } catch (error) {
        // need to be tested 
        const errorMsg = error.response.data.message
        if (errorMsg === 'Error:不能追蹤自己!') {
          Toast.fire({
            title: '不能追蹤自己！',
            html: ToastIcon.redCrossHtml
          }) 
          } else if (errorMsg === 'Error:你已經追蹤該使用者！') {
            Toast.fire({
              title: '已追蹤該使用者',
              html: ToastIcon.redCrossHtml
            }) 
        } else { 
          Toast.fire({
            title: '追蹤失敗',
            html: ToastIcon.redCrossHtml
          }) 
        } 
      }
    }
  },
  created () {
    const { id } = this.$route.params
    if(this.$route.name === 'follow-page-followers') {
      this.fetchFollowers( id )
      return
    }  
    this.fetchFollowings( id )
  },
  beforeRouteCreated (to, from, next) {
    const { id } = this.$route.params
    if(this.$route.name === 'follow-page-followers') {
      this.fetchFollowers( id )
      return
    }  
    this.fetchFollowings( id )
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/post.scss';
.followBlock {
  position: relative;
  width: 100%;
  height: 158px;
  display: flex;
  border-bottom: 1px solid $color-tab-line;
  &__avatar {
    @extend %avatar;
    &:hover ~ div > div > p {
      text-decoration: underline;
    }
  }
  &__wrapper {
    width: 80%;
    margin-left: 90px;
    margin-top: 20px;
    &__header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      &__name {
        @extend %name_;
      }
      &__btn--following {
        @include setButton (
          $color-white,
          $color-brand,
          50px,
          16px,
          8px
        )
      }
      &__btn--follow {
         @include setButton (
          $color-brand,
          $color-white,
          50px,
          16px,
          8px
        )
      }
    }
    &__content {
      @extend %description-font;
      color: $color-black;
    }
  }

}
</style>