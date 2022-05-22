<template>
<div v-show="!isLoading">  
  <FollowUsers 
    :user="user"
    :initial-list="followList"
    @update="updateTop"
  />
</div>
</template>

<script>
import FollowUsers from '../components/FollowUsers.vue'
import usersAPI from '../apis/users'
import { Toast, ToastIcon } from '../utils/helpers'


export default {
  name: 'FollowingsPage',
  props: {
    user: {
      type: Object,
      required: true
    },
    rerenderList: {
      type: Number,
      default: 0
    }
  },
  components: {
    FollowUsers,
  },
  data () {
    return {
      followList: [],
      isLoading: true
    }
  },
  methods: {
    async fetchFollowings ( id ) {
      try {
        const { data } = await usersAPI.userFollowings( id )

        this.followList = data 

        if ( !data.length ) {
          Toast.fire({
            title: '尚無追蹤者',
            html: ToastIcon.yellowWarningHtml
          })
        }
        
        this.isLoading = false

      } catch (error) {
           Toast.fire({
            title: '無法取得資料',
            html: ToastIcon.redCrossHtml
          })
        this.isLoading = false
      }
    },
     updateTop () {
      this.$emit('update')
    },
    rerender ( ){
      this.fetchFollowings(this.user.id)
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchFollowings ( id )
  },
  watch: {
    'rerenderList': {
      handler: 'rerender'
    }
  }
}
</script>

