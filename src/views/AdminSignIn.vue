<template>
  <div class="container">
    <div class="row">
      <div class="admin col-lg-4 col-xl-4">
        <img 
         class="
         admin__logo 
         mt-8"
         src="../assets/icons/Icon.png"
        >
        <h3 
         class="
         admin__header 
         mt-6"
         >
          後台登入
        </h3>
        <form 
          @submit.stop.prevent="handleSubmit"
          class="admin__form"
        >
          <div 
           class="
           admin__form__wrapper 
           mt-8"
          >
            <label for="admin__form__wrapper__account">
            帳號
            </label>
            <input type="account" 
            v-model="account"
            :class="{'error': a.error}"
            name="account"
            id="admin__form__wrapper__account" 
            placeholder="請輸入帳號" 
            required
            autofocus
            >
            <label
             class="error-message"
            >
              {{ a.warning }}
            </label>
          </div> 
          <div 
            class="
            admin__form__wrapper 
            mt-6"
          >
            <label for="admin__form__wrapper__password">
            密碼
            </label>
            <input type="password" 
            v-model="password"
            :class="{'error': p.error }"
            name="password"
            id="admin__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
            <label
             class="error-message"
            >
              {{ p.warning}}
            </label>
          </div> 
          <button   
           class="admin__form__btn--submit
           mt-8"
           :disabled="isProcessing"
          >
            {{ isProcessing? '處理中': '登入'}}
          </button>
        </form>
        <ul 
         class="admin__ul
         mt-4"
         >
            <li 
            class="admin__ul__li
            mr-3"
            >
              <router-link to="/signin">
                前台登入
              </router-link>
            </li>
          </ul>
      </div> 
    </div>
  </div>
</template>

<script>
import { Toast, ToastIcon } from '../utils/helpers'
import { preventInputBlank } from '../utils/mixins'
import adminAPI from '../apis/admin'

export default {
  name: 'AdminSignIn',
  data () {
    return {
      account: '',
      password: '',
      a: {
        error: false,
        warning: ''
      },
      p: {
        error: false,
        warning: ''
      },
      isProcessing: false
    }
  },
  mixins: [preventInputBlank],
  methods: {
    async handleSubmit () {
      try {
        this.isProcessing = true 
        // avoid empty data
        if (!this.account.trim() || !this.password.trim()){
          Toast.fire({
            title: '帳號、密碼不可空白',
            html: ToastIcon.redCrossHtml
          })
          this.isProcessing = false
          return
        }

        // add API 
        const { data } = await adminAPI.signIn({
          account: this.account,
          password: this.password
        })

        localStorage.setItem('token', data.token)
        Toast.fire({
          title: '登入成功',
          html: ToastIcon.greenCheckHtml
        })
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/admin/posts')

      } catch (error) {
        this.isProcessing = false
        const errorMsg = error.response.data.message
        if( errorMsg === 'Error:帳號或密碼錯誤！') {
          Toast.fire({
            title: '帳號或密碼錯誤',
            html: ToastIcon.redCrossHtml 
          })
          this.password = ''
        } else if ( errorMsg === 'Error:帳號不存在！') {
          this.a.error = true
          this.a.warning = '帳號不存在！'
        } else {
          Toast.fire({
            title: '登入失敗，請重新確認',
            html: ToastIcon.redCrossHtml 
          })
          this.password = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signIn.scss';
.admin {
  @extend %signin;
}
</style>
