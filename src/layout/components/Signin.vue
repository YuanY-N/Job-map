<template>
  <div class="tool">
    <div v-if="signedIn" class="signedIn">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <router-link to="/resume">
            <el-dropdown-item>
              resume
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="signOut">
            <span style="display:block;">Sign Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else>
      <div class="signin">
        <router-link to="/signin">Sign in</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

export default {
  name: 'Signin',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'signedIn',
      'user'
    ])
  },
  methods: {
    async signOut() {
      await firebase.auth().signOut()
      this.$router.push(`/signin?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped>

.tool {
  position: fixed;
  right: 50px;
  top: 10px;
}

.signin {
  padding: 12px;
  background: #fff;
  margin-right: 10px;
}

.avatar-container {
  margin-right: 10px;

  .avatar-wrapper {
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
      display: none;
    }
  }
}

</style>
