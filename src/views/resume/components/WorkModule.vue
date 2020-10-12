<template>
  <div>
    <div class="work">Work History</div>
    <div v-for="(work, i) in works" :key="i">
      <work-item :work="work" :uid="uid" />
    </div>
    <div class="te">
      <span @click="clearMarkers">clear markers</span>
    </div>
    <div>
      <el-button v-if="mode !== 'addWork'" type="primary" style="width: 100%" @click="changeMode('addWork')"><i class="el-icon-plus" />add</el-button>
      <work-item v-if="mode === 'addWork'" :work="{}" :uid="uid" :work-mode="'add'" @close-add="changeMode('')" />
    </div>
  </div>
</template>
<script>
import { db } from '@/db.js'
import WorkItem from './WorkItem'

const markers = [
  {
    name: 'House of Aleida Greve',
    description: 'description 1',
    date_build: '',
    position: {
      lat: 40.730610,
      lng: -73.934242
    }
  },
  {
    name: 'House of Aleida Greve 2',
    description: 'description 1',
    date_build: '',
    position: {
      lat: 40.730610,
      lng: -73.935242
    }
  },
  {
    name: 'House of Aleida Greve 3',
    description: 'description 1',
    date_build: '',
    position: {
      lat: 40.730610,
      lng: -73.916242
    }
  }
]

export default {
  name: 'WorkModule',
  components: {
    WorkItem
  },
  props: {
    uid: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      works: [],
      mode: ''
    }
  },
  created() {
    this.$bind('works', db.collection('resumes').doc(this.uid).collection('works'))
  },
  methods: {
    changeMode(mode) {
      this.mode = mode
    },
    clearMarkers() {
      this.$store.dispatch('marker/fetchMarkers', markers)
    }
  }
}
</script>
<style lang="scss" scoped>
.work {
  margin: 20px 0;
}
</style>

