<template>
  <div id="post-header">
    <div @click.prevent.stop="backToHome" class="back-btn">
      <div class="back-btn__icon"></div>
      <h5 class="back-btn__descript__name">推文</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalPageHeader",
  data() {
    return {
      tweetsAmount: 25,
    };
  },
  methods: {
    backToHome() {
      this.$router.push('/home')
    },
  },
};
</script>

<style lang="scss" scoped>
#post-header{
  @extend %header_
}
.back-btn {
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  &__icon {
    @include setIcon(
      17px,
      14px,
      url("../assets/icons/left-arrow.png"),
      url("../assets/icons/left-arrow.png")
    ) {
      margin-right: 20px;
    }
  }
  &__descript {
    &__name {
      line-height: 26px;
    }
  }
}
</style>