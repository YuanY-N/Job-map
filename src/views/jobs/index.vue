<template>
  <div class="root">
    <div class="container">
      <div class="omibox">
        <el-input
          v-model="text"
          placeholder="search jobs"
          :clearable="true"
          @keyup.enter.native="submit"
        >
          <i slot="prefix" class="el-input__icon el-icon-location-outline" />
          <i slot="suffix" class="el-input__icon el-icon-search" @click="submit" />
        </el-input>
      </div>
    </div>
    <div class="filters">
      <el-select v-model="value" placeholder="select" style="width: 120px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary">More filters</el-button>
    </div>
    <div class="section-divider bottom-line" style="height: 0px;" />
    <div class="jobs">
      <div class="list">
        <div v-for="job in jobs" :key="job._id" class="item">
          {{ job._source.email }}
        </div>
      </div>
      <div class="page">
        page
      </div>
      <div class="bottom">
        bott
      </div>
    </div>
  </div>
</template>
<script>
import { client } from '@/db.js'

export default {
  name: 'Jobs',
  data() {
    return {
      text: '',
      jobs: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  created() {
    this.text = this.$route.query.q
    console.log('created: ' + this.text)
    this.submit()
  },
  methods: {
    async submit() {
      console.log(this.text)
      this.$store.dispatch('app/toggleLoading', true)
      try {
        const res = await client.search({
          index: 'users',
          body: {
            query: {
              match_all: { }
            }
          }
        })
        this.$store.dispatch('app/toggleLoading', false)
        this.jobs = res.hits.hits
        console.log(res)
      } catch (err) {
        this.$store.dispatch('app/toggleLoading', false)
        this.$message.error(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.root {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  flex: none;
}

.container {
  background-color: #fff;
  padding: 1px 0 5px;
}

.omibox {
  margin: 8px 8px 8px 8px
}

.filters {
  padding: 0 12px 12px;
  background-color: #fff;
}

.bottom-line {
  border-bottom: 1px solid #e6e6e6;
}

.jobs {
  background-color: #fff;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.jobs::-webkit-scrollbar, .list::-webkit-scrollbar {
  width: 6px;
}
.jobs::-webkit-scrollbar-thumb, .list::-webkit-scrollbar-thumb {
  background-color: #888;
}
.jobs::-webkit-scrollbar-track, .list::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

.list {
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.page {
  border-top: 1px solid #DADCE0;
  padding: 8px 24px;
}

.bottom {

}

</style>
