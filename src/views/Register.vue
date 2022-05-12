<template>
  <div class="container">
    <div class="row">
      <div class="register col-lg-4 col-xl-4">
        <h1>Register</h1>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
}
</script>

<style lang="scss" scoped>
  .register {
    margin: 0 auto;
  }
</style>