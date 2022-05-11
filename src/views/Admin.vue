<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <AdminSideBar />
      </div>
      <div class="col-lg-10 col-xl-10">
        main content
        <router-view />
        <!-- Two sub-pages -->
      </div>  
    </div> 
  </div>
</template>

<script>
import AdminSideBar from '../components/AdminSideBar.vue'

export default {
  name: 'Admin',
  components: {
    AdminSideBar,
  }
}

</script>

<style lang="scss" scoped>
  
</style>
