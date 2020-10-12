<template>
  <section :class="[{ close: isClosed }, 'app-main']">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <div class="button-container">
      <button class="toggle-button" @click="isClosed = !isClosed" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      isClosed: false
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.app-main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 408px;
  height: 100vh;
  border-right: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.button-container {
  position: fixed;
  z-index: 0;
  top: 8px;
  left: 408px;
}

button {
  background: transparent;
  border: 0;
  border-radius: 0;
  font: inherit;
  list-style: none;
  margin: 0;
  outline: 0;
  overflow: visible;
  padding: 0;
  vertical-align: baseline;
}

.toggle-button {
  width: 23px;
  height: 48px;
  cursor: pointer;
  background: rgba(255,255,255,0.9) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAQAAAAXDMSnAAAAi0lEQVR4AX3JQcqBURQG4O/+9WNG30D3vOfSDTuQsgcZyBakZANSzMVMBme3zsBI5/VMn4ZKLP5ki1E4tYejWpilxVUtzOEUD68odYmXR5BJNp/4zllXD2phllYvamHmirsayUkfJ5ruHzueTldC08kcT5YOY9xYujqQM03XKXuaLmEtNF1e1Nz89gbL+0do6OEwRwAAAABJRU5ErkJggg==) 7px center/7px 10px no-repeat;
  border-left: 1px solid #D4D4D4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
}

.close .toggle-button {
  transform: scaleX(-1);
}

.close {
  left: -408px;
}

.close .button-container {
  left: 0px;
}

</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
