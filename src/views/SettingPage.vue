<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="col-lg-7 col-xl-7">
        main content
      </div>  
    </div> 
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'

export default {
  name: 'SettingPage',
  components: {
    SideBar,
  }
}
</script>

<style lang="scss" scoped>
  
</style>