<template>
  <div v-if="signedIn">
    <home-page :uid="user.uid" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { HomePage } from './components'

export default {
  name: 'Home',
  components: {
    HomePage
  },
  computed: {
    ...mapGetters([
      'signedIn',
      'user'
    ])
  }
}
</script>
