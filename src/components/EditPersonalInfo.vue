<template>
  <div id="edit-modal" class="modal">
    <div class="modal__mask">
      <div class="modal__container">
        <div class="modal__container__header my-1 py-2 px-3">
          <div @click.prevent.stop="cancelEdit" class="cancel-icon"></div>
          <h5 class="modal__container__header__title">編輯個人資料</h5>
          <button
            @click.prevent.stop="saveEdit"
            :disabled="
              nameTextArea.warning !== '' || introTextArea.warning !== ''
            "
            class="modal__container__header__save"
          >
            儲存
          </button>
        </div>
        <div class="modal__container__main">
          <div class="modal__container__main__cover">
            <img :src="user.cover | emptyCover" alt="" />
            <div class="modal__container__main__cover__icons">
              <label for="cover-upload"><div class="camera-icon"></div></label>
              <button @click.prevent.stop="regretCoverChange">
                <div class="cancel-icon"></div>
              </button>
              <form action="" ref="coverupload">
                <input
                  id="cover-upload"
                  @change="handleCoverChange"
                  type="file"
                  accpet="image/*"
                />
              </form>
            </div>
          </div>
          <div class="modal__container__main__avatar">
            <div class="avatar-mask"></div>
            <img :src="user.avatar | emptyAvatar" alt="" />
            <label for="avatar-upload"><div class="camera-icon"></div></label>
            <input
              id="avatar-upload"
              @change="handleAvatarChange"
              type="file"
              accpet="image/*"
            />
          </div>
          <div class="modal__container__main__info p-3">
            <div class="modal__container__main__info__name">
              <label for="">名稱</label>
              <input
                v-model="user.name"
                type="text"
                placeholder="Placeholder"
                :class="{ error: nameTextArea.warning !== '' }"
              />
              <label for="" class="error-message">{{
                nameTextArea.warning
              }}</label>
              <label for="" class="text-count">{{ nameTextLength }}/50</label>
            </div>
            <div class="modal__container__main__info__introduction">
              <label for="">自我介紹</label>
              <textarea
                v-model="user.introduction"
                :class="{ error: introTextArea.warning !== '' }"
              />
              <label for="" class="error-message">{{
                introTextArea.warning
              }}</label>
              <label for="" class="text-count">{{ introTextLength }}/160</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountShow, emptyAvatar, emptyCover } from "../utils/mixins";
import { Toast, ToastIcon } from "../utils/helpers";
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
      nameTextArea: {
        warning: "",
      },
      introTextArea: {
        warning: "",
      },
      tempCover: "",
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
    cancelEdit() {
      this.$emit("cancelEdit");
    },
    saveEdit() {
      // add api here
      if (this.nameTextArea.warning !== "") {
        Toast.fire({
          title: `姓名${this.nameTextArea.warning}`,
          html: ToastIcon.redCrossHtml,
        });
        return;
      } else if (this.introTextArea.warning !== "") {
        Toast.fire({
          title: `自我介紹${this.introTextArea.warning}`,
          html: ToastIcon.redCrossHtml,
        });
        return;
      }else{
        this.$emit("saveEdit", this.user);
        Toast.fire({
          title: '成功儲存個人資料',
          html: ToastIcon.greenCheckHtml,
        });
      }
      
    },
    handleCoverChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.cover = "";
      } else {
        const coverURL = window.URL.createObjectURL(files[0]);
        this.user.cover = coverURL;
      }
    },
    handleAvatarChange(e) {
      const { files } = e.target;
      console.log(e.target.parentElement);
      if (files.length === 0) {
        this.user.avatar = "";
      } else {
        const avatarURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = avatarURL;
      }
    },
    regretCoverChange() {
      this.user.cover = this.tempCover;
      this.$refs.coverupload.reset();
    },
    textLength(text) {
      return text.trim().length;
    },
  },
  computed: {
    nameTextLength() {
      return this.textLength(this.user.name);
    },
    introTextLength() {
      return this.textLength(this.user.introduction);
    },
  },
  watch: {
    "user.name"(text) {
      if (this.textLength(text) === 0) {
        this.nameTextArea.warning = "名稱不可空白";
      } else if (this.textLength(text) > 50) {
        this.nameTextArea.warning = "字數超出上限";
      } else {
        this.nameTextArea.warning = "";
      }
    },
    "user.introduction"(text) {
      if (this.textLength(text) > 160) {
        this.introTextArea.warning = "字數超出上限";
      } else {
        this.introTextArea.warning = "";
      }
    },
  },
  created() {
    this.loadUserData();
    this.tempCover = this.user.cover;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/modal.scss";
.modal {
  &__mask {
    @extend %modal-backdrop;
  }
  &__container {
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
        @include setButton($color-white, $color-brand, 50px, 16px, 8px) {
          &:disabled {
            color: $color-white;
            background: $color-gray-4;
            border-color: $color-gray-3;
          }
        }
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
          object-fit: cover;
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
          object-fit: cover;
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
#cover-upload {
  display: none;
}
#avatar-upload {
  display: none;
}
</style>