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
// import adminAPI from '../apis/admin'

const dummyPosts = [
  {
    TweetUser: {
      account: 'user1',
      avatar: '',
      id: 14,
      name: 'newUser1'
    },
    UserId: 14,
    createdAt: '2022-05-18T02:03:19.000Z',
    description: '點擊side bar「推文清單」按鈕，可以在推文清單中看所有推文，並可在推文清單上瀏覽推文的前 50 個字。點擊side bar「推文清單」按鈕，可以在推文清單中看所有推文，並可在推文清單上瀏覽推文的前 50 個字。',
    id: 3,
    isLiked: false,
    likeCount: 1,
    replyCount: 0,
    updatedAt: '2022-05-18T02:03:19.000Z'
  },
  {
    TweetUser: {
      account: 'user1',
      avatar: '',
      id: 24,
      name: 'newUser1'
    },
    UserId: 14,
    createdAt: '2022-05-18T02:03:19.000Z',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma',
    id: 4,
    isLiked: false,
    likeCount: 1,
    replyCount: 0,
    updatedAt: '2022-05-18T02:03:19.000Z'
  },
  {
    TweetUser: {
      account: 'user1',
      avatar: '',
      id: 34,
      name: 'newUser1'
    },
    UserId: 14,
    createdAt: '2022-05-18T02:03:19.000Z',
    description: 'nsistent design standards that align to business goals. With SwaggerHub, you can accelerate your team’s design',
    id: 5,
    isLiked: false,
    likeCount: 1,
    replyCount: 0,
    updatedAt: '2022-05-18T02:03:19.000Z'
  },
  {
    TweetUser: {
      account: 'user1',
      avatar: '',
      id: 44,
      name: 'newUser1'
    },
    UserId: 14,
    createdAt: '2022-05-18T02:03:19.000Z',
    description: 'ff',
    id: 2,
    isLiked: false,
    likeCount: 1,
    replyCount: 0,
    updatedAt: '2022-05-18T02:03:19.000Z'
  },
  {
    TweetUser: {
      account: 'user1',
      avatar: '',
      id: 54,
      name: 'newUser1'
    },
    UserId: 14,
    createdAt: '2022-05-18T02:03:19.000Z',
    description: 'ff',
    id: 1,
    isLiked: false,
    likeCount: 1,
    replyCount: 0,
    updatedAt: '2022-05-18T02:03:19.000Z'
  }
]
  

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
      // try {
      //   const response = await adminAPI.getPosts()

      //   console.log(response)
      // } catch (error) {
      //   console.log('error', error)
      // }

      this.posts = dummyPosts
    },
    async deletePost( id ) {
      try {
        // const response = await adminAPI.deletePost(id)

        // console.log(response)

        this.posts = this.posts.filter( post => 
          post.id !== id
        )

      } catch (error) {
        console.log('error', error)
        // Error:推文不存在！
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