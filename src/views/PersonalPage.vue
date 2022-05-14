<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2 col-xl-2">
        <SideBar />
      </div>
      <div class="col-lg-7 col-xl-7">
        <PersonalPageHeader />
        <PersonalInfo />
        <EditPersonalInfo />
        <PersonalPageTabs />
        <router-view />
        <!--Three sub-pages -->
      </div>
      <div class="col-lg-3 col-xl-3">
        <PopularUsers />
      </div> 
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PopularUsers from '../components/PopularUsers.vue'
import PersonalPageHeader from '../components/PersonalPageHeader.vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import EditPersonalInfo from '../components/EditPersonalInfo.vue'
import PersonalPageTabs from '../components/PersonalPageTabs.vue'

export default {
  name: 'PersonalPage',
  components: {
    SideBar,
    PopularUsers,
    PersonalInfo,
    EditPersonalInfo,
    PersonalPageTabs,
    PersonalPageHeader,
  },
}
</script>

<style lang="scss" scoped>
</style>