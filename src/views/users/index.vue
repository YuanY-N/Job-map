<template>
  <div>
    <div class="container">
      <div class="omibox">
        <el-input
          v-model="text"
          placeholder="search users"
          :clearable="true"
          @keyup.enter.native="submit"
        >
          <i slot="prefix" class="el-input__icon el-icon-user" />
          <i slot="suffix" class="el-input__icon el-icon-search" @click="submit" />
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Jobs',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    submit() {
      console.log(this.text)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 1px 0 15px;
}

.omibox {
  margin: 8px 8px 8px 8px
}

</style>
