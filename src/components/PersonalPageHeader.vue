<template>
  <div id="personal-header" class="py-3 px-4">
    <div @click.prevent.stop="backToHome" class="back-btn">
      <div class="back-btn__icon"></div>
      <div class="back-btn__descript">
        <h5 class="back-btn__descript__name">{{currentUser.name}}</h5>
        <p class="back-btn__descript__num-tweets">{{tweetsAmount}} 推文</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// check post numbers

export default {
  name: "PersonalPageHeader",
  data(){
    return{
      tweetsAmount: 25
    }
  },
  methods: {
    backToHome() {
      this.$router.push("/home");
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
};
</script>

<style lang="scss" scoped>
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