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
        <div class="post__response__comment"></div>
        <div class="post__response__like"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "PostBlockFull",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  filters: {
    showDate(dateTime) {
      moment.locale("zh-tw");
      const time = moment(dateTime).format("LT");
      const date = moment(dateTime).format("LL");
      const timeZone = moment(dateTime).hour > 12 ? '下午' : '上午'
      return dateTime ? `${timeZone} ${time}・${date}` : "--";
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
      @include setIcon(25px, 25px, $icon-reply, $icon-reply){
        margin-right: 130px;
      }
    }
    &__like {
      @include setIcon(25px, 25px, $icon-heart, $icon-heart-liked);
    }
  }
}
</style>