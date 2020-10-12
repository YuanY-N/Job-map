<template>
  <div>
    <google-map />
    <app-main />
    <signin />
  </div>
</template>
<script>
import { GoogleMap, AppMain, Signin } from './components'

export default {
  components: {
    GoogleMap,
    AppMain,
    Signin
  }
}
</script>
