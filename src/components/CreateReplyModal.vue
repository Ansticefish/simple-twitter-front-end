<template>
  <div class="modal">
    <div class="modal__header modal-header">
      <img
       @click.stop.prevent="closeModal" 
       class="modal__header__btn--close
       ml-3"
       src="../assets/icons/cross-modal.png" 
       >
    </div>
    <div class="modal__post">
      <img :src="post.TweetUser.avatar | emptyAvatar" 
        alt="avatar"
        class="modal__post__avatar"
      >
      <div class="modal__post__content mr-3">
        <div class="modal__post__content__header">
          <p>
            {{ post.TweetUser.name }}
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
        <p class="modal__post__content__body">
          {{ post.description }}
        </p>
      </div>
      <div class="modal__post__footer">
        <p>
          回覆給
        </p>
        <p class="ml-1">
          {{ post.TweetUser.account | accountShow }}
        </p>
      </div>
    </div>
    <form 
      @submit.stop.prevent="createReply(post.id)"
      class="modal__reply">
      <img :src="currentUser.avatar | emptyAvatar" 
        alt="avatar"
        class="modal__reply__avatar"
      >
      <textarea
        v-model="replyContent"
        class="modal__reply__textarea mr-3"
        placeholder="推你的回覆"
      >
      </textarea>
      <div class="modal__reply__wrapper modal-footer mb-4">
        <p 
          class="modal__reply__wrapper__warning 
          warning
          mr-3">
          {{ warning }}
        </p>
        <button type="submit"
          class="modal__reply__wrapper__btn--submit mr-2"
          :disabled="isProcessing"
        >
          回覆
        </button>
      </div>
    </form>
  </div> 
</template>

<script>
import { emptyAvatar, accountShow, fromNow } from "../utils/mixins"
import { Toast, ToastIcon } from '../utils/helpers'
import postsAPI from '../apis/posts'

export default {
  name: 'CreateReplyModal',
  props: {
    post: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
  },
  mixins: [emptyAvatar, accountShow, fromNow],
  data () {
    return {
      replyContent: '',
      warning: '',
      isProcessing: true
    }
  },
  methods: {
    closeModal () {
      this.replyContent = ''
      this.$emit('closeReplyModal')
    },
    async createReply () {
      try {
        this.isProcessing = true

        if (!this.replyContent.trim()) {
          this.warning = '內容不可空白'
          this.isProcessing = false
          return
        }

        await postsAPI.createReply({
          postId: this.post.id,
          comment: this.replyContent
        })

        //ask postBlockShort to update replyCount
        this.$emit('add-reply', this.post.id)
        this.replyContent = ''
        this.closeModal()

      
        Toast.fire({
          title: '已成功回覆貼文',
          html: ToastIcon.greenCheckHtml
        })   


      } catch (error) {
        this.isProcessing = false
        const errorMsg = error.response.data.message
        if ( errorMsg === 'Error:回覆不可超過140字！'){
          this.warning = '字數不可超過140字'
        } else if ( errorMsg === 'Error:回覆內容不可空白！') {
          this.warning = '內容不可空白'
        } else {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        }
      }
    }
  },
  watch: {
    'replyContent': {
      handler: function () {
        if ( this.replyContent.trim().length > 0 &&
          this.replyContent.length < 141
        ) {
          this.warning = ''
          this.isProcessing = false
        } else if (this.replyContent.length > 140) {
          this.warning = '字數不可超過140字'
          this.isProcessing = true
        } else {
          this.warning = '內容不可空白'
          this.isProcessing = true
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/modal.scss';
@import '../assets/scss/post.scss';
.modal {
  @extend %modal;
  height: fit-content;
}

.modal__post {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: fit-content;
  &::before {
    // create line
    content: '';
    width: 2px;
    height: 50%;
    background: $color-gray-5;
    position: absolute;
    left: 48px;
    top: 82px;
  }
  &__avatar {
   @extend %avatar;
  }
  &__content {
    width: 85%;
    padding: 28px 5px;
    height: fit-content;
    &__header {
      display: flex;
      align-items: center;
    }
    &__body {
      margin-top: 8px;
      height: fit-content;
      @extend %description-font;
    }
  }
  &__footer {
    display: flex;
    align-self: flex-start;
    margin-top: 10px;
    margin-left: 85px; 
    &::before {
    // create line
    content: '';
    width: 2px;
    height: 50px;
    background: $color-gray-5;
    position: absolute;
    left: 48px;
    bottom: -10px;
  }
  }
}


// font-style
.modal__post__content__header {
  @extend %post-header-font;
}

.modal__post__footer {
  & > p {
      color: $color-secondary;
      font-size: 14px;
      font-weight: 400; 
    }
  & > p ~ p {
    color: $color-brand;
  } 
}

.modal__reply {
  @extend %modal-form;
  margin-top: 10px;
}

</style>