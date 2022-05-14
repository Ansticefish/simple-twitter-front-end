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
          @submit.stop.prevent="handleSubmit"
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
            @keypress="addAccountPrefix"
            name="account"
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
            @keyup="controlTextLength"
            name="name"
            id="register__form__wrapper__name" 
            placeholder="請輸入名稱"
            maxlength="50"
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
            <input type="email" 
            v-model="email"
            name="email"
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
            <input type="password" 
            v-model="password"
            name="password"
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
            <input type="password" 
            v-model="checkPassword"
            name="checkPassword"
            id="register__form__wrapper__checkPassword" 
            placeholder="請再次輸入密碼" 
            required
            >
          </div> 
          <button   
           class="register__form__btn--submit
           mt-8 
           mb-6"
           :disabled="isProcessing"
          >
            {{ isProcessing? '資料處理中': '註冊'}}
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
import { Toast, ToastIcon } from '../utils/helpers'

export default {
  name: 'Register',
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false
    }
  },
  methods: {
    handleSubmit() {
      this.isProcessing = true

      // avoid empty data
      if(!this.account.slice(1).trim() || 
      !this.name.trim() ||
      !this.email.trim() ||
      !this.password.trim() ||
      !this.checkPassword.trim()) {
        Toast.fire({
          title: '欄位不可空白',
          html: ToastIcon.redCrossHtml
        })
        this.isProcessing = false
        return
      }
      
      // name < 50 characters
      if (this.name.length > 50) {
        Toast.fire({
          title: '名稱不可超過50字',
          html: ToastIcon.redCrossHtml
        })
        this.isProcessing = false
        return
      }

      // check password and checkPassword value
      if (this.password !== this.checkPassword) {
        Toast.fire({
          title: '兩次密碼不同，請重新輸入',
          html: ToastIcon.redCrossHtml
        })
        this.checkPassword = ''
        this.isProcessing = false
        return
      }

      // Add API
      // handle errors from server
      // if successfully register
      Toast.fire({
        title: '註冊成功，請至登入頁面登入',
        html: ToastIcon.greenCheckHtml
      })
      this.$router.push({ name: 'sign-in'})

    },
    addAccountPrefix () {
      const account = this.account.trim()
      if(account.length >= 1) return
      this.account = '@' + account
    },
    controlTextLength () {
      if (this.name.length > 50) {
        Toast.fire({
          title: '名稱不可超過50字',
          html: ToastIcon.redCrossHtml
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signIn.scss';

.register {
  @extend %signin;
  &__link {
    color: $color-primary;
    text-decoration: underline;
  }
}

</style>