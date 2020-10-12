<template>
  <div>
    <el-card class="box-card">
      <div v-if="mode !== 'add'" slot="header" class="clearfix">
        <span style="float: right; padding: 3px 0" type="text">
          <i class="el-icon-edit-outline big" title="edit this item" @click="change('edit')" />
          <el-popconfirm
            title="Are you sure want to delete this item？"
            confirm-button-text="Yes"
            cancel-button-text="cancel"
            @onConfirm="del(work.id)"
          >
            <i slot="reference" class="el-icon-delete big" title="delete this item" />
          </el-popconfirm>
        </span>
      </div>
      <el-form label-position="right" label-width="80px" :model="obj">
        <el-form-item label="title">
          <el-input v-model="obj.title" placeholder="java developer" :disabled="mode === 'show'" />
        </el-form-item>
        <el-form-item label="company">
          <el-input v-model="obj.company" :disabled="mode === 'show'" />
        </el-form-item>
        <el-form-item label="start year">
          <el-input v-model="obj.syear" :disabled="mode === 'show'" />
        </el-form-item>
        <el-form-item label="end year">
          <el-input v-model="obj.eyear" :disabled="mode === 'show'" />
        </el-form-item>
        <el-form-item v-if="mode !== 'show'">
          <el-button type="primary" @click="save(work.id)">save</el-button>
          <el-button type="primary" @click="change('show')">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { db } from '@/db.js'

export default {
  name: 'WorkItem',
  props: {
    work: {
      type: Object,
      default: function() {
        return {}
      }
    },
    workMode: {
      type: String,
      default: 'show'
    },
    uid: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      obj: {},
      mode: 'show'
    }
  },
  created() {
    this.obj = { ...this.work }
    this.mode = this.workMode
  },
  methods: {
    change(mode) {
      if (this.mode === 'add') {
        this.$emit('close-add')
      } else {
        this.mode = mode
      }
    },
    del(id) {
      db.collection('resumes').doc(this.uid).collection('works').doc(id).delete()
    },
    save(id) {
      if (this.mode === 'edit') {
        db.collection('resumes').doc(this.uid).collection('works').doc(id).update({ ...this.obj })
      } else {
        this.$emit('close-add')
        db.collection('resumes').doc(this.uid).collection('works').doc(`${Date.now()}`).set({ ...this.obj })
      }
      this.change('show')
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  margin: 20px 0;
}
.big {
  font-size: 32px;
}
</style>
