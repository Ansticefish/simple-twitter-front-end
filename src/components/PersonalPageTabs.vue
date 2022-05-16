<template>
  <div class="personal-tabs">
    <ul class="tabs">
      <li :class="{ active: this.$route.name === 'personal-page-posts' }">
        <router-link
          :to="{
            name: 'personal-page-posts',
            params: { userAccount: userAccount },
          }"
          >推文
        </router-link>
      </li>
      <li :class="{ active: this.$route.name === 'personal-page-replies' }">
        <router-link
          :to="{
            name: 'personal-page-replies',
            params: { userAccount: userAccount },
          }"
          >回覆
        </router-link>
      </li>
      <li :class="{ active: this.$route.name === 'personal-page-liked' }">
        <router-link
          :to="{
            name: 'personal-page-liked',
            params: { userAccount: userAccount },
          }"
          >喜歡的內容
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PersonalPageTabs",
  props: {
    userAccount: {
      tyep: String,
      default: "",
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.personal-tabs{
  border-bottom: 1px solid $color-tab-line;
}
.tabs {
  @extend %tab-style;
}
</style>