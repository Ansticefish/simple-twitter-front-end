<template>
  <div :class="['modal', { 'home-style' : isHome}]">
    <div class="
      modal__header
      modal-header
    ">
      <img
       v-show="!isHome"
       @click.stop.prevent="closeModal" 
       class="modal__header__btn--close
       ml-3"
       src="../assets/icons/cross-modal.png" 
       >
    </div>
    <form 
      @submit.stop.prevent="createPost"
      class="modal__content">
      <img 
        :src="currentUser.avatar | emptyAvatar" 
        alt="avatar"
        class="modal__content__avatar"
      >
      <textarea
        v-model="postContent"
        class="modal__content__textarea ml-2"
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
import { mapState } from "vuex"
import { emptyAvatar } from "../utils/mixins"

export default {
  name: 'CreatePostModal',
  props: {
    isHome: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      postContent: '',
      warning: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mixins: [ emptyAvatar ],
  methods: {
    closeModal () {
      this.postContent = ''
      this.$emit('closeCreateModal')
    },
    createPost () {
      this.isProcessing = true

      if (!this.postContent.trim()) {
        this.warning = '內容不可空白'
        this.isProcessing = false
        return
      }

      if(this.postContent.length > 140){
        this.warning = '字數不可超過140字'
        this.isProcessing = false
        return
      }

      // send request
      console.log('create')
      // if succeed
      this.closeModal()
      this.postContent = ''
    },
  },
  watch: {
    'postContent': {
      handler: function () {
        if ( this.postContent.trim().length > 0 &&
          this.postContent.length < 141
        ) {
          this.warning = ''
        } else if (this.postContent.length > 140) {
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
}

.modal__content {
  @extend %modal-form;
}

// style used in HomePage 
.home-style {
  width: 100%;
}
 
</style>