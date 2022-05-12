<template>
  <div class="container">
    <div class="row">
      <div class="register col-lg-4 col-xl-4">
        <img 
         class="
         register__logo 
         mt-8"
         src="../assets/icons/Icon.png"
        >
        <h3 
         class="
         register__header 
         mt-6"
         >
          建立你的帳號
        </h3>
        <form 
          @submit.stop.prevent=""
          class="register__form"
        >
          <div 
           class="
           register__form__wrapper 
           mt-8"
          >
            <label for="register__form__wrapper__account">
            帳號
            </label>
            <input type="text" 
            v-model="account"
            name="register__form__wrapper__account"
            id="register__form__wrapper__account" 
            placeholder="請輸入帳號" 
            required
            autofocus
            >
          </div> 
          <div 
            class="
            register__form__wrapper 
            mt-6"
          >
            <label for="register__form__wrapper__name">
            名稱
            </label>
            <input type="text" 
            v-model="name"
            name="register__form__wrapper__name"
            id="register__form__wrapper__name" 
            placeholder="請輸入名稱" 
            required
            >
          </div> 
          <div 
            class="
            register__form__wrapper 
            mt-6"
          >
            <label for="register__form__wrapper__email">
              Email
            </label>
            <input type="text" 
            v-model="email"
            name="register__form__wrapper__email"
            id="register__form__wrapper__email" 
            placeholder="請輸入Email" 
            required
            >
          </div>
          <div 
            class="
            register__form__wrapper 
            mt-6"
          >
            <label for="register__form__wrapper__password">
            密碼
            </label>
            <input type="text" 
            v-model="password"
            name="register__form__wrapper__password"
            id="register__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
          </div>  
          <div 
            class="
            register__form__wrapper 
            mt-6"
          >
            <label for="register__form__wrapper__checkPassword">
            密碼確認
            </label>
            <input type="text" 
            v-model="checkPassword"
            name="register__form__wrapper__checkPassword"
            id="register__form__wrapper__checkPassword" 
            placeholder="請再次輸入密碼" 
            required
            >
          </div> 
          <button   
           class="register__form__btn--submit
           mt-8 
           mb-6"
          >
            註冊
          </button>
        </form>
        <router-link 
          class="register__link"
          to="/signin">
          取消
        </router-link>
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
      checkPassword: ''
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signInStyle.scss';

.register {
  @extend %signin;
  &__link {
    color: $color-primary;
    text-decoration: underline;
  }
}

</style>