<template>
  <div>
    <work-module :uid="uid" />
    <div class="work">Edu History</div>
    <div v-for="(edu, i) in edus" :key="'edu' + i">
      <edu-item :edu="edu" :uid="uid" />
    </div>
  </div>
</template>
<script>
import { db } from '@/db.js'
import WorkModule from './WorkModule'
import EduItem from './EduItem'

export default {
  name: 'HomePage',
  components: {
    WorkModule,
    EduItem
  },
  props: {
    uid: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      edus: []
    }
  },
  created() {
    this.$bind('edus', db.collection('resumes').doc(this.uid).collection('edus'))
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.work {
  margin: 20px 0;
}
</style>
