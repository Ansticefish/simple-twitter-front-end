<template>
  <div class="container">
    <div class="row">
      <div class="sign-in col-lg-4 col-xl-4">
        <div></div>
        <h3>建立你的帳號</h3>
        <form 
          @submit.stop.prevent=""
          class="form"
        >
          <div 
           class="form__wrapper mt-8"
          >
            <label for="form__wrapper__account">
            帳號
            </label>
            <input type="text" 
            v-model="account"
            name="form__wrapper__account"
            id="form__wrapper__account" 
            placeholder="請輸入帳號" 
            required
            autofocus
            >
          </div> 
          <div 
            class="form__wrapper mt-6"
          >
            <label for="form__wrapper__password">
            密碼
            </label>
            <input type="text" 
            v-model="password"
            name="form__wrapper__password"
            id="form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
          </div> 
        </form>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      account: '',
      password: '',
    }
  },
}
</script>

<style lang="scss" scoped>
  .sign-in {
    margin: 0 auto;
  }

  .form {
    &__wrapper {
      @extend %input-style;
    }
  }
</style>