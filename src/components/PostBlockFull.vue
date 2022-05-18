<template>
  <div class="post-full">
    <div class="post p-3">
      <div class="post__main pb-2">
        <div class="post__main__info">
          <img
            :src="post.TweetUser.avatar"
            alt=""
            class="post__main__info__avatar mr-2"
          />
          <div class="post__main__info__creater">
            <p class="post__main__info__creater__name">
              {{ post.TweetUser.name }}
            </p>
            <p class="post__main__info__creater__account">
              {{ post.TweetUser.account }}
            </p>
          </div>
        </div>
        <div class="post__main__description my-2">{{ post.description }}</div>
        <div class="post__main__created-time">
          {{ post.createdAt | showDate }}
        </div>
      </div>
      <div class="post__footer py-3">
        <p class="post__footer__comment-count mr-5">
          <span>{{ post.replyCount }}</span> 回覆
        </p>
        <p class="post__footer__like-count">
          <span>{{ post.likeCount }}</span> 喜歡次數
        </p>
      </div>
      <div class="post__response pt-3 my-1">
        <div @click.prevent.stop="reply" class="post__response__comment"></div>
        <div
          v-if="post.isLiked"
          @click.prevent.stop="unlike"
          class="post__response__like active"
        ></div>
        <div
          v-else
          @click.prevent.stop="like"
          class="post__response__like"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import postAPI from "../apis/posts";
import { Toast, ToastIcon } from "../utils/helpers";
import moment from "moment";
export default {
  name: "PostBlockFull",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    reply() {
      this.$emit('replyPost')
    },
    async like() {
      try {
        await postAPI.likePost(this.post.id);
        this.$emit('likePost')

      } catch (err) {
        const errorMessage = err.response.data.message.split(':')
        Toast.fire({
          title: errorMessage[1],
          html: ToastIcon.redCrossHtml,
        });
      }
    },
    async unlike() {
     try {
        await postAPI.unlikePost(this.post.id);
        this.$emit('unlikePost')
      } catch (err) {
        const errorMessage = err.response.data.message.split(':')
        Toast.fire({ 
          title: errorMessage[1],
          html: ToastIcon.redCrossHtml,
        });
      }
    },
  },
  filters: {
    showDate(dateTime) {
      moment.locale("zh-tw", {
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
          "_"
        ),
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        longDateFormat: {
          lll: "A h:mm・YYYY年MMMD日",
        },
        meridiemHour: function (h, meridiem) {
          let hour = h;
          if (hour === 12) {
            hour = 0;
          }
          if (
            meridiem === "凌晨" ||
            meridiem === "早上" ||
            meridiem === "上午"
          ) {
            return hour;
          } else if (meridiem === "下午" || meridiem === "晚上") {
            return hour + 12;
          } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
          }
        },
        meridiem: function (hour, minute) {
          const hm = hour * 100 + minute;
          if (hm < 600) {
            return "凌晨";
          } else if (hm < 900) {
            return "早上";
          } else if (hm < 1130) {
            return "上午";
          } else if (hm < 1230) {
            return "中午";
          } else if (hm < 1800) {
            return "下午";
          } else {
            return "晚上";
          }
        },
      });
      return dateTime ? moment(dateTime).format("lll") : "--";
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  border-bottom: 1px solid $color-tab-line;
  &__main {
    border-bottom: 1px solid $color-tab-line;
    &__info {
      display: flex;
      align-items: center;
      &__avatar {
        @extend %avatar_;
      }
      &__creater {
        &__name {
          @extend %name_;
        }
        &__account {
          @extend %account_;
        }
      }
    }
    &__description {
      font-size: 24px;
      line-height: 36px;
    }
    &__created-time {
      @extend %account_;
      font-weight: 500;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $color-tab-line;
    &__comment-count,
    &__like-count {
      font-size: 19px;
      line-height: 28px;
      color: $color-secondary;
      span {
        font-family: $number-font;
        font-size: 19px;
        font-weight: bold;
      }
    }
  }
  &__response {
    &__comment {
      @include setIcon(25px, 25px, $icon-reply, $icon-reply) {
        margin-right: 130px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    &__like {
      @include setIcon(23px, 26px, $icon-heart, $icon-heart-liked) {
      }
    }
  }
}
</style>