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
      <img :src="post.avatar | emptyAvatar" 
        alt="avatar"
        class="modal__post__avatar"
      >
      <div class="modal__post__content mr-3">
        <div class="modal__post__content__header">
          <p>
            {{ post.name}}
          </p>
          <p class="ml-1">
            {{ post.account | accountShow }}
          </p> 
          <div class="ml-1">
          </div>
          <p class="ml-1">
           {{ post.createdAt | fromNow }}
          </p>
        </div>
        <p class="modal__post__content__body">
          {{ post.description }}
        </p>
        <div class="modal__post__content__footer">
          <p>
            回覆給
          </p>
          <p class="ml-1">
            {{ post.account | accountShow }}
          </p>
        </div>
      </div>
    </div>
    <form 
      @submit.stop.prevent="createReply"
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

const dummyPost = {
  id: 55,
  createdAt: '',
  updatedAt: '',
  description: '',
  user: {
    id: 6,
    account: 'Twitter',
    name: 'Twit',
    avatar: null,
  }
}


export default {
  name: 'CreateReplyModal',
  props: {
    postId: {
      type: Number,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyAvatar, accountShow, fromNow],
  data () {
    return {
      post: {
        id: -1,
        createdAt: '',
        description: '',
        account: '',
        name: '',
        avatar: '',
      },
      replyContent: '',
      warning: '',
      isProcessing: false
    }
  },
  methods: {
    fetchPost (postId) {
      console.log( postId )
      // fetch post through API
      const { id, createdAt, description, user } = dummyPost
      
      this.post = {
        id,
        createdAt,
        description,
        account: user.account,
        name: user.name,
        avatar: user.avatar
      }
    },
    closeModal () {
      this.postContent = ''
      this.$emit('closeReplyModal')
    },
    createReply () {
      this.isProcessing = true

      if (!this.replyContent.trim()) {
        this.warning = '內容不可空白'
        this.isProcessing = false
        return
      }

      if(this.replyContent.length > 140){
        this.warning = '字數不可超過140字'
        this.isProcessing = false
        return
      }

      // send request
      console.log('create')
      // if succeed
      this.closeModal()
      this.replyContent = ''
    },
  },
  created ( ) {
    this.fetchPost ( this.postId )
  },
  watch: {
    'replyContent': {
      handler: function () {
        if ( this.replyContent.trim().length > 0 &&
          this.replyContent.length < 141
        ) {
          this.warning = ''
        } else if (this.replyContent.length > 140) {
          this.warning = '字數不可超過140字'
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/modal.scss';
.modal {
  @extend %modal;
  height: 450px;
}

.modal__post {
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 33%;
  &::before {
    // create line
    content: '';
    width: 2px;
    height: 86px;
    background: $color-gray-5;
    position: absolute;
    left: 48px;
    top: 82px;
  }
  &__avatar {
    position: absolute;
    top: 16px;
    left: 24px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  &__content {
    width: 85%;
    padding: 28px 5px;
    &__header {
      display: flex;
      align-items: center;
    }
    &__body {
      margin-top: 8px;
      color: #1c1c1c;
      font-weight: 400;
      font-size: 15px;
    }
    &__footer {
      display: flex;
      margin-top: 11px;
    }
  }
}


// font-style
.modal__post__content__header {
  & > p {
      color: #1c1c1c;
      font-size: 15px;
      font-weight: 700; 
    }
    & > p ~ p {
      color: $color-secondary;
      font-size: 14px;
      font-weight: 400; 
    }
    & > p ~ p ~ p {
      color: $color-secondary;
      font-size: 14px;
      font-weight: 400; 
    }
    div {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: $color-secondary;
    }
}

.modal__post__content__footer {
  & > p {
      color: $color-secondary;
      font-size: 14px;
      font-weight: 400; 
    }
  & > p ~ p {
    color: $color-aid-orange;
  } 
}

.modal__reply {
  @extend %modal-form;
  margin-top: 16px;
}

</style>