<template>
  <div>
    <div v-if="mode === 'show'">
      {{ edu }} - {{ uid }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'EduItem',
  props: {
    edu: {
      type: Object,
      default: function() {
        return {}
      }
    },
    uid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mode: 'show' // edit, new
    }
  }
}
</script>
