<template>
  <div class="container">
    <div class="row">
      <div class="signin col-lg-4 col-xl-4">
        <img 
         class="
         signin__logo 
         mt-8"
         src="../assets/icons/Icon.png"
        >
        <h3 
         class="
         signin__header 
         mt-6"
         >
          登入 Alphitter
        </h3>
        <form 
          @submit.stop.prevent="handleSubmit"
          class="signin__form"
        >
          <div 
           class="
           signin__form__wrapper 
           mt-8"
          >
            <label for="signin__form__wrapper__account">
            帳號
            </label>
            <input type="text" 
            v-model="account"
            @keypress="addAccountPrefix"
            name="account"
            id="signin__form__wrapper__account"
            :class="{'error': a.error}" 
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
            signin__form__wrapper 
            mt-6"
          >
            <label for="signin__form__wrapper__password">
            密碼
            </label>
            <input type="password" 
            v-model="password"
            :class="{'error': p.error }"
            name="password"
            id="signin__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
            <label
             class="error-message"
            >
              {{ p.warning }}
            </label>
          </div> 
          <button   
           class="signin__form__btn--submit
           mt-8"
           :disabled="isProcessing"
          >
            {{ isProcessing? '處理中': '登入'}}
          </button>
        </form>
        <ul 
         class="signin__ul
         mt-4"
         >
            <li 
            class="signin__ul__li
            mr-3"
            >
              <router-link to="/register">
                註冊
              </router-link>
            </li>
            <li 
             class="signin__ul__li
             mr-3">
              <div 
              class="signin__ul__li__dot" 
              >
              </div>
            </li>
            <li
             class="signin__ul__li"
            >
              <router-link to="/admin/signIn">
                後台登入
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

const dummyUser = {
  account: 'root',
  password: '12345678'
}

const dummyData = {
  status: 'success',
  message: 'You have signed in!',
  token: '0516',
  currentUser: {
    id: 56,
    account: 'root',
    name: 'root99',
    avatar: '@/assets/icons/bell.png',
    isAdmin: '',
  }
}

export default {
  name: 'SignIn',
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
      if (dummyData.status !== 'success'){
        throw new Error(dummyData.message)
      }

       // not registered before (error from server)
        //  this.a.error = true
        //  this.a.warning = '帳號不存在！'
        //  this.isProcessing = false
        //  return
    
      

      // sign in successfully or not
      if (this.account.slice(1).trim() === dummyUser.account && this.password === dummyUser.password){
        Toast.fire({
          title: '登入成功',
          html: ToastIcon.greenCheckHtml
        })
        localStorage.setItem('token', dummyData.token)
      } else {
        Toast.fire({
          title: '帳號密碼不正確，請重新確認',
          html: ToastIcon.redCrossHtml
        })
        this.password = ''
        this.isProcessing = false
        return
      }

      // if user successfully sign in
      this.$store.commit('setCurrentUser', dummyData.user)
      this.$router.push({ name: 'home-page'})
    },
    addAccountPrefix () {
      const account  = this.account.trim()
      if (account.length >= 1) return
      this.account = '@' + account
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signIn.scss';

.signin {
  @extend %signin;
}
 
// set up dot style
.signin__ul {
  &__li {
    display: flex;
    align-items: center;
    &__dot {
      height: 3px;
      width: 3px;
      border-radius: 50%;
      background: #000000;
    }
  }
} 

</style>