<template>
  <ul 
    class="tab"
  >
    <li 
    :class="{ 'active': this.$route.name === 'follow-page-followers'}">
      <router-link 
        :to="{ 
        name: 'follow-page-followers',
        params: { id: this.$route.params.id },
        }"
      >
        追隨者
      </router-link>
    </li>
    <li
      :class="{ 'active': this.$route.name === 'follow-page-following'}"
    >
      <router-link
        :to="{ 
        name: 'follow-page-following',
        params: { id: this.$route.params.id },
        }"
      >
        正在追蹤
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FollowTab'
}

</script>

<style lang="scss" scoped>
.tab {
    @extend %tab-style;
    height: 52px;
    border-bottom: 1px solid $color-tab-line;
  }
</style>