<template>
  <div class="adminPost">
    <div class="adminPost__header">
      <h4>推文清單</h4>
    </div>
    <!-- render posts -->
    <div 
      v-for="post in posts"
      :key="post.id"
      class="adminPost__post">
      <img 
        :src="post.TweetUser.avatar | emptyAvatar" 
        alt="avatar"
        class="adminPost__post__avatar"
      >
      <div class="adminPost__post__content">
        <div class="adminPost__post__content__header">
          <p 
           class="name"
          >
            {{ post.TweetUser.name}}
          </p>
          <p class="ml-2">
            {{ post.TweetUser.account | accountShow }}
          </p> 
          <div class="ml-2">
          </div>
          <p class="ml-2">
           {{ post.createdAt | fromNow }}
          </p>
        </div>
        <p 
         class="adminPost__post__content__body">
          {{ post.description | filterContent }}
        </p>
      </div>
       <img
          @click.stop.prevent="deletePost(post.id)"
          class="adminPost__post__btn--delete"
          src="../assets/icons/cross-admin.png" alt="delete"
       >
   </div>
  </div>
</template>

<script>
import { accountShow, emptyAvatar, fromNow } from "../utils/mixins"
import adminAPI from '../apis/admin'
import { Toast, ToastIcon } from '../utils/helpers'

export default {
  name: 'AdminPostList',
  data () {
    return {
      posts: []
    }
  },
  mixins: [ accountShow, emptyAvatar, fromNow ],
  methods: {
    async fetchPosts () {
      try {
        const { data } = await adminAPI.getPosts()
        this.posts = data
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          title: '無法取得推文清單',
          html: ToastIcon.redCrossHtml
        })
      }
    },
    async deletePost( id ) {
      try {
        await adminAPI.deletePost(id)

        this.posts = this.posts.filter( post => 
          post.id !== id
        )

        Toast.fire({
          title: '推文刪除成功',
          html: ToastIcon.greenCheckHtml
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
            title: '推文刪除失敗',
            html: ToastIcon.redCrossHtml
          })
        }
      }
    }
  },
  created () {
    this.fetchPosts()
  },
  filters: {
    filterContent ( content ) {
      return content.slice(0, 50)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/modal.scss';
@import '../assets/scss/post.scss';
.adminPost {
  &__header {
    @extend %header_;
  }
  &__post {
    @extend %post;
    height: 118px;
    &__avatar {
      @extend %avatar;
      &:hover {
        cursor: default;
      } 
    }
    &__content {
      width: 90%;
      padding: 28px 5px;
      &__header {
        @extend %post-header-font;
        display: flex;
        align-items: center;
        & .name {
          @extend %name_;
          &:hover {
            cursor: default;
            text-decoration: none;
          }   
        }
      }
      &__body {
        @extend %body;
      }
    }
     &__btn--delete {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 15px;
      height: 15px;
      &:hover {
        opacity: 0.6;
        cursor: pointer;
      }
    }
  }  
}


</style>