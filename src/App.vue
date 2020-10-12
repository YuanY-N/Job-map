<template>
  <div id="app">
    <router-view v-loading="loading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
}
</script>
<style>
.el-loading-mask {
  background-color: rgba(255,255,255,.3);
}
</style>
