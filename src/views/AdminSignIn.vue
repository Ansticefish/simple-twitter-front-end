<template>
  <div class="container">
    <div class="row">
      <div class="admin-sign-in col-lg-4 col-xl-4">
        <h1>Admin sign in</h1>
        <h2>test Scss shared files.</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSignIn',
  data () {
    return {
      email: '',
      password: '',
    }
  },
}
</script>

<style lang="scss" scoped>
  .admin-sign-in {
    margin: 0 auto;
  }
</style>
