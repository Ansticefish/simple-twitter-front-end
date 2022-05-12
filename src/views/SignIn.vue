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
          @submit.stop.prevent=""
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
            name="signin__form__wrapper__account"
            id="signin__form__wrapper__account" 
            placeholder="請輸入帳號" 
            required
            autofocus
            >
          </div> 
          <div 
            class="
            signin__form__wrapper 
            mt-6"
          >
            <label for="signin__form__wrapper__password">
            密碼
            </label>
            <input type="text" 
            v-model="password"
            name="signin__form__wrapper__password"
            id="signin__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
          </div> 
          <button   
           class="signin__form__btn--submit
           mt-8"
          >
            登入
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
@import '../assets/scss/signInStyle.scss';

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