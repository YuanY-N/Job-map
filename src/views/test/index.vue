<template>
  <div>
    test page
    <div v-for="(item, i) in jobs" :key="i">
      <span>{{ item }}</span><el-button style="width: 300px" type="primary" @click.native.prevent="remove(item.id)">Remove</el-button>
    </div>
    <el-input
      ref="email"
      v-model="text"
      placeholder="email"
      name="email"
      type="text"
      tabindex="1"
      auto-complete="on"
    />
    <el-button style="width: 300px" type="primary" @click.native.prevent="add">Add</el-button>
  </div>
</template>
<script>
import { db } from '@/db.js'
export default {
  name: 'Home',
  data() {
    return {
      jobs: [],
      text: ''
    }
  },

  mounted() {
  },

  firestore: {
    jobs: db.collection('users')
  },

  methods: {
    add() {
      db.collection('users').doc('test').set({
        name: this.text
      })
    },
    remove(e) {
      db.collection('users')
        .doc(e)
        .delete()
    }
  }
}
</script>
