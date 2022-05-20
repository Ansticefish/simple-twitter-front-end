<template>
  <div id="reply-block">
    <div v-for="reply in replies" :key="reply.id" class="reply py-3 px-4">
      <img
        @click="getIntoPersonalPage(reply.ReplyUser.id, reply.ReplyUser.namet)"
        :src="reply.ReplyUser.avatar | emptyAvatar"
        alt=""
        class="reply__avatar mr-2"
      />
      <div class="text-wrapper">
        <div class="reply__replier mb-2">
          <span
            @click="getIntoPersonalPage(reply.ReplyUser.id, reply.ReplyUser.name)"
            class="reply__replier__name mr-2"
            >{{ reply.ReplyUser.name }}</span
          >
          <span class="reply__replier__account-time"
            >{{ reply.ReplyUser.account | accountShow }}・{{
              reply.createdAt | fromNow
            }}</span
          >
        </div>
        <p
          @click="getIntoPersonalPage(reply.TweetUser.id, reply.TweetUser.name)"
          class="reply__creater mb-2"
        >
          回覆 <span>{{ reply.TweetUser.account | accountShow }}</span>
        </p>
        <p class="reply__content">
          {{ reply.comment }}
        </p>
        <div
          v-if="reply.ReplyUser.id !== currentUser.id"
          class="reply__response mt-2"
        >
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
import {
  accountShow,
  emptyAvatar,
  fromNow,
  getIntoPersonalPage,
} from "../utils/mixins";
import { mapState } from "vuex";

export default {
  name: "ReplyBlock",
  mixins: [accountShow, emptyAvatar, fromNow, getIntoPersonalPage],
  props: {
    replies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style lang="scss" scoped>
.reply {
  width: 100%;
  display: flex;
  border-bottom: 1px solid $color-tab-line;
  &__avatar {
    @extend %avatar_;
    &:hover + div .reply__replier__name {
      text-decoration: underline;
    }
  }
  &__replier {
    &__name,
    &__account-time {
      line-height: 26px;
    }
    &__name {
      @extend %name_;
    }
    &__account-time {
      @extend %account_;
    }
  }
  &__creater {
    @extend %account_;
    span {
      color: $color-brand;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  &__content {
    @extend %content_;
  }
  &__response {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__reply {
      display: flex;
      align-items: center;
      &__icon {
        @include setIcon(14px, 14px, $icon-reply, $icon-reply) {
          margin-right: 8px;
        }
      }
      &__num {
        @extend %num_;
      }
    }
    &__like {
      display: flex;
      align-items: center;
      &__icon {
        @include setIcon(15px, 14px, $icon-heart, $icon-heart-liked) {
          margin-right: 8px;
        }
      }
      &__num {
        @extend %num_;
      }
    }
  }
}
</style>