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
          @submit.stop.prevent=""
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
            <input type="text" 
            v-model="email"
            name="admin__form__wrapper__email"
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
            <input type="text" 
            v-model="password"
            name="admin__form__wrapper__password"
            id="admin__form__wrapper__password" 
            placeholder="請輸入密碼" 
            required
            >
          </div> 
          <button   
           class="admin__form__btn--submit
           mt-8"
          >
            登入
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
export default {
  name: 'Adminadmin',
  data () {
    return {
      email: '',
      password: '',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/signInStyle.scss';
.admin {
  @extend %signin;
}
</style>
