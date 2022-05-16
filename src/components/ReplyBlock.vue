<template>
  <div id="reply-block">
    <div v-for="reply in replies" :key="reply.id" class="reply py-3 px-4">
      <img
        :src="reply.reply_user.avatar | emptyAvatar"
        alt=""
        class="reply__avatar mr-2"
      />
      <div class="text-wrapper">
        <div class="reply__replier mb-2">
          <span class="reply__replier__name mr-2">{{
            reply.reply_user.name
          }}</span>
          <span class="reply__replier__account-time"
            >{{ reply.reply_user.account | accountShow }}・{{
              reply.createdAt | fromNow
            }}</span
          >
        </div>
        <p class="reply__creater mb-2">
          回覆 <span>{{ reply.post_user.account | accountShow }}</span>
        </p>
        <p class="reply__content">
          {{ reply.comment }}
        </p>
        <div 
          v-if="reply.post_user.id !== currentUser.id"
          class="reply__response mt-2">
          <div class="reply__response__reply mr-8">
            <div class="reply__response__reply__icon"></div>
            <span class="reply__response__reply__num">25</span>
          </div>
          <div class="reply__response__like">
            <div class="reply__response__like__icon"></div>
            <span class="reply__response__like__num">25</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountShow, emptyAvatar, fromNow } from "../utils/mixins";
import {mapState} from 'vuex'

export default {
  name: "ReplyBlock",
  mixins: [accountShow, emptyAvatar, fromNow],
  props: {
    replies: {
      type: Array,
      required: true,
    },
  },
  computed:{
    ...mapState(['currentUser'])
  }
};
</script>

<style lang="scss" scoped>
.reply {
  display: flex;
  border-bottom: 1px solid $color-tab-line;
  &__avatar {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  &__replier {
    &__name,
    &__account-time {
      line-height: 26px;
    }
    &__name {
      font-weight: bold;
    }
    &__account-time {
      font-size: $font-size-secondary;
      color: $color-secondary;
    }
  }
  &__creater {
    font-size: $font-size-secondary;
    color: $color-secondary;
    span {
      color: $color-brand;
    }
  }
  &__content {
    line-height: 26px;
  }
  &__response {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__reply {
      display: flex;
      align-items: center;
      &__icon {
        @include setIcon(14px, 14px, $icon-reply, $icon-reply){
          margin-right: 8px;
        }
      }
      &__num {
        font-size: $font-size-secondary;
        color: $color-secondary;
      }
    }
    &__like {
      display: flex;
      align-items: center;
      &__icon {
        @include setIcon(15px, 14px, $icon-heart, $icon-heart-liked){
          margin-right: 8px;
        }
      }
      &__num {
        font-size: $font-size-secondary;
        color: $color-secondary;
      }
    }
  }
}
</style>