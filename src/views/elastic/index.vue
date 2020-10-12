<template>
  <div style="min-height: 100vh">
    elastic page
    {{ users }}
  </div>
</template>
<script>

import { client } from '@/db.js'

export default {
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    // client
    this.$store.dispatch('app/toggleLoading', true)
    const res = await client.search({
      index: 'users',
      body: {
        query: {
          match_all: { }
        }
      }
    })
    console.log(res)
    this.$store.dispatch('app/toggleLoading', false)
    this.users = res.hits.hits
  }
}
</script>
