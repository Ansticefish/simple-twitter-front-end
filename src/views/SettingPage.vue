<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="setting col-lg-7 col-xl-7">
        <div class="setting__header">
          <h4>帳戶設定</h4>
        </div>
        <div class="setting__body">
          <form 
          @submit.stop.prevent="handleSubmit"
          class="setting__body__form"
          >
            <div 
            class="
            setting__body__form__wrapper 
            mt-8"
            >
              <label for="setting__body__form__wrapper__account">
              帳號
              </label>
              <input type="text" 
              v-model="account"
              :class="{'error': a.error}"
              name="account"
              id="setting__body__form__wrapper__account" 
              placeholder="請輸入帳號" 
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
              setting__body__form__wrapper 
              mt-6"
            >
              <label for="setting__body__form__wrapper__name">
              名稱
              </label>
              <input type="text" 
              v-model="name"
              :class="{'error': n.error}"
              name="name"
              id="setting__body__form__wrapper__name" 
              placeholder="請輸入名稱"
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
              setting__body__form__wrapper 
              mt-6"
            >
              <label for="setting__body__form__wrapper__email">
                Email
              </label>
              <input type="email" 
              v-model="email"
              :class="{ 'error': m.error}"
              name="email"
              id="setting__body__form__wrapper__email" 
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
              setting__body__form__wrapper 
              mt-6"
            >
              <label for="setting__body__form__wrapper__password">
              密碼
              </label>
              <input type="password" 
              v-model="password"
              :class="{'error': p.error}"
              name="password"
              id="setting__body__form__wrapper__password" 
              placeholder="請設定密碼" 
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
              setting__body__form__wrapper 
              mt-6"
            >
              <label for="setting__body__form__wrapper__checkPassword">
              密碼再確認
              </label>
              <input type="password" 
              v-model="checkPassword"
              :class="{'error': cp.error}"
              name="checkPassword"
              id="setting__body__form__wrapper__checkPassword" 
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
            id="setting__body__form__btn--submit"   
            class="setting__body__form__btn--submit
            mt-8 
            mb-6"
            :disabled="isProcessing"
            >
              儲存
            </button>
          </form>
        </div>
      </div>  
    </div> 
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import { Toast, ToastIcon } from '../utils/helpers'
import { mapState } from 'vuex'
import { preventInputBlank } from '../utils/mixins'
import usersAPI from '../apis/users'

export default {
  name: 'SettingPage',
  components: {
    SideBar,
  },
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
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchCurrentUser () {
      const { account, name, email } = this.currentUser
      this.account = account
      this.name = name
      this.email = email
    },
    async handleSubmit () {
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
          Toast.fire({
            title: '兩次密碼不同，請重新輸入',
            html: ToastIcon.redCrossHtml
          })
          this.checkPassword = ''
          this.isProcessing = false
          return
        }

        await usersAPI.editUserSetting({
          id: this.currentUser.id,
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })

 
        Toast.fire({
          title: '資料更新成功',
          html: ToastIcon.greenCheckHtml
        })

        this.isProcessing = false
        // save new user data to vuex
        this.$store.dispatch('fetchCurrentUser')

      } catch(error) {
        this.isProcessing = false
        const errorMsg = error.response.data.message
        if ( errorMsg === 'Error:此 Email 已被註冊！') {
          Toast.fire({
            title: 'Email 已重複註冊！',
            html: ToastIcon.redCrossHtml
          })
        } else if ( errorMsg === 'Error:此帳號已被註冊！') {
          Toast.fire({
            title: 'Account 已重複註冊！',
            html: ToastIcon.redCrossHtml
          })
        } else if( errorMsg ) {
          const message = errorMsg.slice(6)
          Toast.fire({
            title: `${message}`,
            html: ToastIcon.redCrossHtml
          })
        } else {
          Toast.fire({
            title: '資料更新失敗',
            html: ToastIcon.redCrossHtml
          })
        }
      }
    },
  },
  created () {
    this.fetchCurrentUser( )
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signIn.scss';
.setting {
  @extend %main-container_;
  &__header {
    @extend %header_;
  }
  &__body {
    @extend %signin;
    padding: 0px 24px;
    text-align: end;
  }
}

// set button style
#setting__body__form__btn--submit {
  width: 88px;
  height: 46px;
  padding: 0;
  @extend %submitBtnDisable;
}

</style>