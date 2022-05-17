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
            :class="{'error': a.error}"
            name="account"
            id="register__form__wrapper__account" 
            placeholder="請輸入帳號"
            maxlength="50" 
            required
            autofocus
            >
            <label
               class="error-message"
              >
              {{ a.warning }}
              </label>
              <label
               class="text-count"
              >
              {{ account.length}} / 50
              </label>
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
            :class="{'error': n.error}"
            name="name"
            id="register__form__wrapper__name" 
            placeholder="請輸入名稱"
            maxlength="50"
            required
            >
            <label
               class="error-message"
              >
              {{ n.warning }}
              </label>
              <label
               class="text-count"
              >
              {{ name.length }} / 50
              </label>
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
            :class="{ 'error': m.error}"
            name="email"
            id="register__form__wrapper__email" 
            placeholder="請輸入Email" 
            required
            >
            <label
               class="error-message"
              >
              {{ m.warning }}
              </label>
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
            :class="{'error': p.error}"
            name="password"
            id="register__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
            <label
               class="error-message"
              >
              {{ p.warning }}
              </label>
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
            :class="{'error': cp.error}"
            name="checkPassword"
            id="register__form__wrapper__checkPassword" 
            placeholder="請再次輸入密碼" 
            required
            >
             <label
               class="error-message"
              >
              {{ cp.warning }}
              </label>
          </div> 
          <button   
           class="register__form__btn--submit
           mt-8 
           mb-6"
           :disabled="isProcessing"
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
import { Toast, ToastIcon } from '../utils/helpers'
import { preventInputBlank } from '../utils/mixins'
import authorizationAPI from '../apis/authorization'

export default {
  name: 'Register',
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      a: {
        error: false,
        warning: ''
      },
      n: {
        error: false,
        warning: ''
      },
      m: {
        error: false,
        warning: ''
      },
      p: {
        error: false,
        warning: ''
      },
      cp: {
        error: false,
        warning: ''
      },
      isProcessing: false
    }
  },
  mixins: [ preventInputBlank ],
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true

        // avoid empty data
        if(!this.account.trim() || 
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
        

        // check password and checkPassword value
        if (this.password !== this.checkPassword) {
          this.p.error = true
          this.p.warning = '兩次密碼輸入不同'
          this.cp.error = true
          this.cp.warning = '兩次密碼輸入不同'
          this.isProcessing = false
          return
        }
        
        await authorizationAPI.register({
           account: this.account,
           name: this.name,
           email: this.email,
           password: this.password,
           checkPassword: this.checkPassword
        })

        // if successfully register
        Toast.fire({
          title: '註冊成功，請至登入頁面登入',
          html: ToastIcon.greenCheckHtml
        })
        this.$router.push({ name: 'sign-in'})

      } catch (error) {
        this.isProcessing = false
        const message = error.response.data.message
        if (message === 'Error:此 Account 已被註冊！'){
          Toast.fire({
            title: 'Account已重複註冊',
            html: ToastIcon.redCrossHtml
          }) 
        } else if (message === 'Error:此 Email 已被註冊！'){
          Toast.fire({
            title: 'Email已重複註冊',
            html: ToastIcon.redCrossHtml
          }) 
        } else {
          Toast.fire({
            title: '註冊失敗，請確認資料',
            html: ToastIcon.redCrossHtml
          })
        }

        this.password = ''
        this.checkPassword = ''
      }
    },
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