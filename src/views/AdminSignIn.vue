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
            <label for="admin__form__wrapper__email">
            Email
            </label>
            <input type="email" 
            v-model="email"
            name="email"
            id="admin__form__wrapper__email" 
            placeholder="請輸入Email" 
            required
            autofocus
            >
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
            name="password"
            id="admin__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
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
  email: 'admin@example.com',
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
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    handleSubmit () {

      this.isProcessing = true 
      // avoid empty data
      if(!this.email.trim() || !this.password.trim()) {
        Toast.fire({
          title: 'Email、密碼不可空白！',
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
      
      // sign in successfully or not
      if ( this.email === dummyAdmin.email && this.password === dummyAdmin.password ) {
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
        this.isProcessing = false
        return
      }

      // if successfully sign in 
      this.$store.commit('setCurrentUser', dummyData.currentUser)
      this.$router.push('/admin/users')
    } 
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signInStyle.scss';
.admin {
  @extend %signin;
}
</style>
