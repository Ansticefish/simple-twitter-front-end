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
            :class="{'error': accountError}"
            @keypress="addAccountPrefix"
            name="account"
            id="admin__form__wrapper__account" 
            placeholder="請輸入帳號" 
            required
            autofocus
            >
            <label
             class="error-message"
            >
              {{ accountMessage }}
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
            :class="{'error': passwordError }"
            name="password"
            id="admin__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
            <label
             class="error-message"
            >
              {{ passwordMessage}}
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

const dummyAdmin = {
  account: 'admin',
  password: '12345678'
}

const dummyData = {
  status: 'success',
  message: 'You have signed in!',
  token: '0777',
  currentUser: {
    id: 66,
    account: 'admin',
    name: 'admin',
    avatar: '@/assets/icons/bell.png',
    isAdmin: 'admin',
  }
}


export default {
  name: 'AdminSignIn',
  data () {
    return {
      account: '',
      password: '',
      accountError: false,
      passwordError: false,
      accountMessage: '',
      passwordMessage: '',
      isProcessing: false
    }
  },
  methods: {
    handleSubmit () {

      this.isProcessing = true 
      // avoid empty data
       if (!this.account.slice(1).trim() || !this.password.trim()){
        Toast.fire({
          title: '帳號、密碼不可空白',
          html: ToastIcon.redCrossHtml
        })
        this.isProcessing = false
        return
      }

      // add API
      // handle errors from server
      if(dummyData.status !== 'success') {
        throw new Error(dummyData.message)
      }

      // not registered before (error from server)
        //  this.accountError = true
        //  this.accountMessage = '帳號不存在！'
        //  this.isProcessing = false
        //  return
      
      // sign in successfully or not
      if ( this.account === dummyAdmin.account && this.password === dummyAdmin.password ) {
        // if success, store token
        localStorage.setItem('token', dummyData.token)
        Toast.fire({
          title: '登入成功',
          html: ToastIcon.greenCheckHtml
        })
      } else {
        Toast.fire({
          title: '登入失敗，請重新確認',
          html: ToastIcon.redCrossHtml 
        })
        this.password = ''
        this.isProcessing = false
        return
      }

      // if successfully sign in 
      this.$store.commit('setCurrentUser', dummyData.currentUser)
      this.$router.push('/admin/users')
    },
    addAccountPrefix () {
      const account = this.account.trim()
      if (account.length >= 1) return
      this.account = '@' + account
    } 
  },
  watch: {
    'account': {
      handler: function () {
        if (!this.account.slice(1).trim()) {
          this.accountError = true
          this.accountMessage = '此欄位不可空白'
        } else {
          this.accountError = false
          this.accountMessage = ''
        }
      }
    },
    'password': {
      handler: function () {
        if (!this.password.trim()) {
          this.passwordError = true
          this.passwordMessage = '此欄位不可空白'
        } else {
          this.passwordError = false
          this.passwordMessage = ''
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signIn.scss';
.admin {
  @extend %signin;
}
</style>
