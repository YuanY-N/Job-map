<template>
  <div>
    <div class="resume-title">Work History</div>
    <div class="content" v-for="(work, i) in works" :key="i">
<!--      <work-item :work="work" :uid="uid" />-->
      <div class="fl-sp">
        <div>
          <div>Company: {{ work.company }}</div>
          <div>title: {{ work.title }}</div>
        </div>
        <div class="work-year"> {{ work.syear }} - {{ work.eyear }}</div>
      </div>

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
    console.log('workmodule===', this.works)
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
.resume-title {
  margin: 20px;
  font-size: 26px;
  position: relative;
}
.resume-title:before {
  content: '';
  display: block;
  border-left: 4px solid #00B38A;
  height: 20px;
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}
.content {
  margin: 10px;
}
.work-year {
  position: absolute;
  right: 10px;
}
.fl-sp {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

