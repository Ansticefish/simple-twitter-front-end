<template>
  <div class="modal">
    <div class="modal__header">
      <img
       v-show="!hideCross"
       @click.stop.prevent="closeModal" 
       class="modal__header__btn--close
       ml-3"
       src="../assets/icons/cross-modal.png" 
       >
    </div>
    <form 
      @submit.stop.prevent="createPost"
      class="modal__content">
      <img :src="currentUser.avatar | emptyAvatar" 
        alt="avatar"
        class="modal__content__avatar"
      >
      <textarea
        v-model="postContent"
        class="modal__content__textarea mr-3"
        placeholder="有什麼新鮮事？"
      >
      </textarea>
      <div class="modal__content__wrapper">
        <p 
          v-show="!hideCross"
          class="modal__content__wrapper__warning mr-3">
          {{ warning }}
        </p>
        <button type="submit"
          class="modal__content__wrapper__btn--submit mb-2 mr-2"
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
    hideCross: {
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
.modal {
    width: 634px;
    height: 300px;
    border-radius: 14px;
    background: #FFFFFF;
    &__header {
      height: 56px;
      border-bottom: 1px solid #E6ECF0;
      padding-top: 19.5px;
      &__btn--close {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }
  }

  .modal__content {
    position: relative;
    width: 100%;
    height: 243px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-wrap: wrap;
    &__avatar {
      position: absolute;
      top: 16px;
      left: 24px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    &__textarea {
      width: 85%;
      flex-grow: 1;
      padding: 28px 5px;
      appearance: none;
      resize: none;
      border: none;
      color: #6C757D;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
    &__wrapper {
      display: flex;
      align-items: center;
      &__warning {
        color: $color-error;
        font-size: 15px;
        font-weight: 500;
      }
      &__btn--submit {
        appearance: none;
        @include setButton(
          $color-white,
          $color-brand,
          50px,
          16px,
          8px
        )
      }
    }
  }

</style>