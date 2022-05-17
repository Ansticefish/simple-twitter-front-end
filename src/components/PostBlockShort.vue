<template>
<div>
  <div 
   v-for="post in posts"
   :key="post.id"
   class="post">
      <img 
        @click.stop.prevent="toPersonalPage(post.TweetUser.id)"
        :src="post.TweetUser.avatar | emptyAvatar" 
        alt="avatar"
        class="post__avatar"
      >
      <div class="post__content">
        <div class="post__content__header">
          <p 
           @click.stop.prevent="toPersonalPage(post.TweetUser.id)"
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
         @click.stop.prevent="toPostPage(post.id)"
         class="post__content__body">
          {{ post.description }}
        </p>
        <div class="post__content__footer">
          <div
           class="post__content__footer__reply">
            <img 
             @click.stop.prevent="openReplyModal(post.id)"
             src="../assets/icons/reply.png" alt="">
            <span class="ml-1"> 
              {{ post.replyCount }}
            </span>
          </div>
          <div 
            v-if="post.isLiked"
            class="post__content__footer__like ml-8">
            <img 
             @click.stop.prevent="unlikePost(post.id)"
             src="../assets/icons/heart-liked.png" alt="">
            <span class="ml-1"> 
              {{ post.likeCount }}
            </span>
          </div>
          <div 
           v-else
           class="post__content__footer__unlike ml-8">
            <img 
             @click.stop.prevent="likePost(post.id)"
             src="../assets/icons/heart.png" alt="">
            <span class="ml-1"> 
              {{ post.likeCount }}
            </span>
          </div>
        </div>
      </div>
   </div>
   <!-- Reply Modal -->
   <div 
      class="modal-backdrop" 
      v-if="openReply"
    >
        <CreateReplyModal 
        :post="selectedPost"
        :currentUser="currentUser"
        @closeReplyModal="closeReplyModal"
        @add-reply="addReply"
        />
    </div>
</div> 
</template>

<script>
import { accountShow, emptyAvatar, fromNow } from "../utils/mixins"
import CreateReplyModal  from "./CreateReplyModal.vue"
import { mapState } from 'vuex'
import postsAPI from '../apis/posts'
import { Toast, ToastIcon } from '../utils/helpers'

export default {
  name: 'PostBlockShort',
  components: {
    CreateReplyModal,
  },
  props: {
    initialPosts: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      posts: [],
      openReply: false,
      selectedPost: ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mixins: [ accountShow, emptyAvatar, fromNow ],
  methods: {
    fetchPosts () {
      this.posts = this.initialPosts
    },
    toPersonalPage (userId) {
      if (this.$route.name === 'home-page' ||
       this.$route.params.id !== userId) {
        this.$router.push({
          name: "personal-page-root",
          params: { id: userId },
        });
      }
    },
    toPostPage ( postId ) {
        this.$router.push({
          name: "single-post",
          params: { id: postId },
        });
    },
    async likePost (postId) {
      try {
        await postsAPI.likePost(
          postId,
        )

        this.posts = this.posts.map( post=> {
          if( post.id === postId) {
            return {
              ...post,
              isLiked: true,
              likeCount: post.likeCount + 1
            }
          } else {
            return post
          }
        })

      } catch (error) {
        const errorMsg = error.response.data.message
        if(errorMsg === 'Error:已對這篇推文按過Like！') {
          Toast.fire({
            title: '已經對這篇貼文按過讚',
            html: ToastIcon.yellowWarningHtml
          })
        }
      }
    },
    async unlikePost (postId) {
      try {
        await postsAPI.unlikePost(
          postId,
        )

        this.posts = this.posts.map( post=> {
          if( post.id === postId) {
            return {
              ...post,
              isLiked: false,
              likeCount: post.likeCount - 1
            }
          } else {
            return post
          }
        })

      } catch (error){
        const errorMsg = error.response.data.message
        if(errorMsg === 'Error:已對這篇推文按過Like！') {
          Toast.fire({
            title: '已經對這篇貼文按過讚',
            html: ToastIcon.yellowWarningHtml
          })
        }
      }
    },
    openReplyModal (postId) {
      this.openReply = true
      this.selectedPost = this.posts.find( post => post.id === postId)
    },
    closeReplyModal () {
      this.openReply = false
    },
    addReply (postId) {
       this.posts = this.posts.map( post=> {
          if( post.id === postId) {
            return {
              ...post,
              replyCount: post.replyCount + 1
            }
          } else {
            return post
          }
        })
    }
  },
  created () {
    this.fetchPosts ()
  },
  watch: {
    'initialPosts':{
      handler: 'fetchPosts'
    }
  }
}
</script>

<style lang="scss" scoped> 
@import '../assets/scss/modal.scss';
@import '../assets/scss/post.scss';
.post {
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 168px;
  border-bottom: 1px solid $color-tab-line;
  &__avatar {
    @extend %avatar;
  }
  &__content {
    width: 85%;
    padding: 28px 5px;
    &__header {
      display: flex;
      align-items: center;
      & .name {
        @extend %name_;
      }
    }
    &__body {
      width: 95%;
      height: 78px;
      margin-top: 8px;
      margin-bottom: 40px;
      @extend %description-font;
      cursor: pointer;
    }
    &__footer {
      display: flex;
      position: absolute;
      bottom: 15px;
      & div {
        display: flex;
        align-items: center;
        & img {
          width: 13px;
          height: 13px;
          object-fit: contain;
          cursor: pointer;
        }
        & span {
          @extend %post-footer-font;
        }
      }
    }
  }
}


.post__content__header {
 @extend %post-header-font;
}

.modal-backdrop {
  @extend %modal-backdrop;
}

</style>