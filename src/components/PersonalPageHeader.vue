<template>
  <div id="personal-header">
    <div @click.prevent.stop="backToPersonalPage" class="back-btn">
      <div class="back-btn__icon"></div>
      <div class="back-btn__descript">
        <h5 class="back-btn__descript__name">{{this.user.name}}</h5>
        <p class="back-btn__descript__num-tweets">{{tweetsAmount}} 推文</p>
      </div>
    </div>
  </div>
</template>

<script>

// check post numbers

export default {
  name: "PersonalPageHeader",
  props:{
    user:{
      type: Object,
      required: true
    }
  },
  data(){
    return{
      tweetsAmount: 25
    }
  },
  methods: {
    backToPersonalPage() {
      this.$router.push({
        name: 'personal-page-posts',
        params: {userAccount: this.user.account}
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#personal-header{
  @extend %header_;
}
.back-btn {
  width: 100px;
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
    &__num-tweets {
      line-height: 19px;
      color: $color-secondary;
    }
  }
}
</style>