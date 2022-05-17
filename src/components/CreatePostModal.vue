<template>
  <div :class="['modal', { 'home-style' : isHome}]">
    <div class="
      modal__header
      modal-header"
      v-if="!isHome"
    >
      <img
       v-if="!isHome"
       @click.stop.prevent="closeModal" 
       class="modal__header__btn--close
       ml-3"
       src="../assets/icons/cross-modal.png" 
       >
    </div>
    <form 
      @submit.stop.prevent="createPost"
      :class="['modal__content', { 'home-style': isHome } ]">
      <img 
        :src="currentUser.avatar | emptyAvatar" 
        alt="avatar"
        class="modal__content__avatar"
      >
      <textarea
        v-model="postContent"
        class="modal__content__textarea mr-1"
        placeholder="有什麼新鮮事？"
        :disabled="isHome"
      >
      </textarea>
      <div class="modal__content__wrapper modal-footer mb-3">
        <p 
          v-show="!isHome"
          class="modal__content__wrapper__warning 
          warning
          mr-3">
          {{ warning }}
        </p>
        <button type="submit"
          class="modal__content__wrapper__btn--submit  mr-2"
          :disabled="isProcessing"
        >
          推文
        </button>
      </div>
    </form>
  </div> 
</template>

<script>
import { emptyAvatar } from "../utils/mixins"
import postsAPI from '../apis/posts'
import { Toast, ToastIcon } from '../utils/helpers'

export default {
  name: 'CreatePostModal',
  props: {
    isHome: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      postContent: '',
      warning: '',
      isProcessing: false
    }
  },
  mixins: [ emptyAvatar ],
  methods: {
    closeModal () {
      this.postContent = ''
      this.$emit('closeCreateModal')
    },
    async createPost () {
      try {
        this.isProcessing = true

        if (!this.postContent.trim()) {
          this.warning = '內容不可空白'
          this.isProcessing = false
          return
        }

        await postsAPI.createPost({
          description: this.postContent
        })

        this.$emit('update-data')
        this.closeModal()
        this.postContent = ''

      } catch (error) {
        const errorMsg = error.response.data.message
        if (errorMsg === 'Error:推文內容不可空白！') {
          Toast.fire({
            title: '內容不可空白',
            html: ToastIcon.redCrossHtml
          })
        }
      }
      

      
    },
  },
  watch: {
    'postContent': {
      handler: function () {
        if ( this.postContent.trim().length > 0 &&
          this.postContent.length < 141
        ) {
          this.warning = ''
          this.isProcessing = false
        } else if (this.postContent.length > 140) {
          this.warning = '字數不可超過140字'
          this.isProcessing = true
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
}

.modal__content {
  @extend %modal-form;
}

// style used in HomePage 
.home-style {
  width: 100%;
  height: 136px;
}

.modal__content.home-style {
  height: 136px;
  flex-wrap: nowrap;
}
 
</style>