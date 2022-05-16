<template>
  <div id="edit-modal" class="modal">
    <div class="modal__mask">
      <div class="modal__container">
        <div class="modal__container__header my-1 py-2 px-3">
          <div 
            @click.prevent.stop="cancelEdit"
            class="cancel-icon"></div>
          <h5 class="modal__container__header__title">編輯個人資料</h5>
          <button 
            @click.prevent.stop="saveEdit"
            class="modal__container__header__save">儲存</button>
        </div>
        <div class="modal__container__main">
          <div class="modal__container__main__cover">
            <img :src="user.cover | emptyCover" alt="" />
            <div class="modal__container__main__cover__icons">
              <div class="camera-icon"></div>
              <div class="cancel-icon"></div>
            </div>
          </div>
          <div class="modal__container__main__avatar">
            <div class="avatar-mask"></div>
            <img :src="user.avatar | emptyAvatar" alt="" />
            <div class="camera-icon"></div>
          </div>
          <div class="modal__container__main__info p-3">
            <div class="modal__container__main__info__name">
              <label for="">Label</label>
              <input
                v-model="user.name"
                type="text"
                placeholder="Placeholder"
              />
              <label for="" class="error-message">error message</label>
              <label for="" class="text-count">11/50</label>
            </div>
            <div class="modal__container__main__info__introduction">
              <label for="">Label</label>
              <textarea v-model="user.introduction" />
              <label for="" class="error-message">error message</label>
              <label for="" class="text-count">11/50</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountShow, emptyAvatar, emptyCover } from "../utils/mixins";
export default {
  name: "EditPersonalInfo",
  mixins: [accountShow, emptyAvatar, emptyCover],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        cover: "",
        avatar: "",
        name: "",
        introduction: "",
      },
    };
  },
  methods: {
    loadUserData() {
      const { cover, avatar, name, introduction } = this.initialUser;
      this.user = {
        cover,
        avatar,
        name,
        introduction,
      };
    },
    cancelEdit(){
      this.$emit('cancelEdit')
    },
    saveEdit(){
      this.$emit('saveEdit')
    }
  },
  created() {
    this.loadUserData();
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__mask {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
  }
  &__container {
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 640px;
    height: 610px;
    background: $color-white;
    border-radius: 14px;
    &__header {
      position: relative;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cancel-icon {
        @include setIcon(15px, 15px, $icon-cross, $icon-cross) {
          &:hover {
            cursor: pointer;
            opacity: 0.6;
          }
        }
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(0, -50%);
      }
      &__title {
        margin-left: 55px;
      }
      &__save {
        @include setButton($color-white, $color-brand, 50px, 16px, 8px);
      }
    }
    &__main {
      position: relative;
      &__cover {
        width: 100%;
        height: 200px;
        position: relative;
        background: $color-black;
        img {
          width: 100%;
          height: 200px;
          opacity: 0.5;
        }
        &__icons {
          position: absolute;
          z-index: 4;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .camera-icon {
            @include setIcon(
              20px,
              20px,
              url("../assets/icons/camera.png"),
              url("../assets/icons/camera.png")
            ) {
              margin-right: 40px;
            }
            &:hover {
              cursor: pointer;
              opacity: 0.6;
            }
          }
          .cancel-icon {
            @include setIcon(
              15px,
              15px,
              url("../assets/icons/cross-white.png"),
              url("../assets/icons/cross-white.png")
            );
            &:hover {
              cursor: pointer;
              opacity: 0.6;
            }
          }
        }
      }
      &__avatar {
        position: absolute;
        z-index: 4;
        top: 125px;
        left: 1rem;
        .avatar-mask {
          position: absolute;
          width: 140px;
          height: 140px;
          border: 4px solid $color-white;
          border-radius: 50%;
          background: $color-black;
          opacity: 0.5;
        }
        img {
          width: 140px;
          height: 140px;
          border: 4px solid $color-white;
          border-radius: 50%;
        }
        .camera-icon {
          position: absolute;
          z-index: 5;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          @include setIcon(
            20px,
            20px,
            url("../assets/icons/camera.png"),
            url("../assets/icons/camera.png")
          );
          &:hover {
            cursor: pointer;
            opacity: 0.6;
          }
        }
      }
      &__info {
        margin-top: 65px;
        &__name {
          @extend %input-style;
          margin-bottom: 2rem;
          width: 100%;
        }
        &__introduction {
          @extend %input-style;
          width: 100%;
          textarea {
            height: 145px;
          }
          .error-message {
            top: 145px;
          }
          .text-count {
            top: 145px;
          }
        }
      }
    }
  }
}
</style>