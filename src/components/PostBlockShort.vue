<template>
<div>
  <div class="post">
      <img 
        @click.stop.prevent="toPersonalPage"
        :src="post.user.avatar | emptyAvatar" 
        alt="avatar"
        class="post__avatar"
      >
      <div class="post__content">
        <div class="post__content__header">
          <p 
           @click.stop.prevent="toPersonalPage"
           class="name"
          >
            {{ post.user.name}}
          </p>
          <p class="ml-1">
            {{ post.user.account | accountShow }}
          </p> 
          <div class="ml-1">
          </div>
          <p class="ml-1">
           {{ post.createdAt | fromNow }}
          </p>
        </div>
        <p 
         @click.stop.prevent="toPostPage"
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
              {{ replyCount }}
            </span>
          </div>
          <div 
            v-if="isLiked"
            class="post__content__footer__like ml-8">
            <img 
             @click.stop.prevent="unlikePost(post.id)"
             src="../assets/icons/heart-liked.png" alt="">
            <span class="ml-1"> 
              {{ likeCount }}
            </span>
          </div>
          <div 
           v-else
           class="post__content__footer__unlike ml-8">
            <img 
             @click.stop.prevent="likePost(post.id)"
             src="../assets/icons/heart.png" alt="">
            <span class="ml-1"> 
              {{ likeCount }}
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
        :postId="selectedPostId"
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

export default {
  name: 'PostBlockShort',
  components: {
    CreateReplyModal,
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      replyCount: this.post.replyCount,
      likeCount: this.post.likeCount,
      isLiked: this.post.isLiked,
      openReply: false,
      selectedPostId: '',
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mixins: [ accountShow, emptyAvatar, fromNow ],
  methods: {
    toPersonalPage () {
      if (this.$route.name === 'home-page' ||
       this.$route.params.userAccount !== this.post.user.account) {
        this.$router.push({
          name: "personal-page-root",
          params: { userAccount: this.post.user.account },
        });
      }
    },
    toPostPage () {
        this.$router.push({
          name: "single-post",
          params: { id: this.post.id },
        });
    },
    likePost (postId) {
      // Add API
      console.log(postId)

      this.isLiked = true
      this.likeCount += 1
    },
    unlikePost (postId) {
      // Add API
      console.log(postId)

      this.isLiked = false
      this.likeCount -= 1
    },
    openReplyModal (postId) {
      this.openReply = true
      this.selectedPostId = postId
    },
    closeReplyModal () {
      this.openReply = false
    },
    addReply () {
      console.log('add replyCount')
      this.replyCount += 1
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
    cursor: pointer;
    &:hover + div > div > .name {
      text-decoration: underline;
    }
  }
  &__content {
    width: 85%;
    padding: 28px 5px;
    &__header {
      display: flex;
      align-items: center;
      & .name {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
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