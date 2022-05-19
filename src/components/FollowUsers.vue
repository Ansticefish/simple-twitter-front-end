<template>
<div  v-if="!isLoading">
  <div 
    v-show="followList.length > 0"
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
  <div 
    v-show="!followList.length"
    class="follow__empty"
  >
     <h5>
       {{ this.$route.name === 'follow-page-followers'? 
       '尚無追隨者': '尚無追蹤者' }}
     </h5> 
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
    }
  },
  mixins: [ emptyAvatar ],
  data () {
    return {
      followList: [],
      isLoading: true,
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchData ( id ) {
      if (this.$route.name === 'follow-page-followers') {
        this.fetchFollowers( id )
        return
      }  
      this.fetchFollowings( id )
    },
    async fetchFollowings ( id ) {
      try {
        const { data } = await usersAPI.userFollowings( id )

        if (data.message === '沒有追隨者名單'){
          this.followList = []
        } else {
          this.followList = data 
        }
        
        this.isLoading = false
      } catch (error) {
        const errorMsg = error.response.data.message
        if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        }
        this.isLoading = false
      }
    },
    async fetchFollowers ( id ) {
      try {
        const { data } = await usersAPI.userFollowers( id )
        this.followList = data

        if (data.message === '沒有粉絲名單'){
          this.followList = []
        } else {
          this.followList = data 
        }

        this.isLoading = false
      } catch (error) {
        const errorMsg = error.response.data.message
        if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        }
        this.isLoading = false
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

         await usersAPI.followUser(id)
      
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
        if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
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
        const errorMsg = error.response.data.message
        if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        } else { 
          Toast.fire({
            title: '取消追蹤失敗',
            html: ToastIcon.redCrossHtml
          }) 
        } 
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchData ( id )
  },
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

.follow__empty {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    color: $color-secondary;
    font-weight: normal;
  } 
}
</style>