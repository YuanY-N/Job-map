<template>
  <div class="signin">
    <el-form
      ref="signinForm"
      :model="signinForm"
      :rules="signinRules"
      class="signin-form"
      auto-complete="on"
      label-position="left"
    >
      <el-card shadow="never">
        <h5 style="text-align: center;">Reset Password</h5>
        <el-form-item prop="email">
          <el-input
            ref="email"
            v-model="signinForm.email"
            placeholder="email"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-button style="width: 300px" type="primary" @click.native.prevent="handleReset">RESET PASSWORD</el-button>
        <div class="group-head">
          <span class="">or reauthenticate</span>
        </div>
        <el-button style="width: 300px" type="primary" @click.native.prevent="githubSignin">SIGN IN WITH GITHUB</el-button>
        <footer class="footer">
          <span style="width: 300px; text-align: center;">We will send you a link to reset your password. If you signed up via github you just need to sign in again.</span>
        </footer>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import { Message } from 'element-ui'

export default {
  name: 'SignIn',
  data() {
    return {
      signinForm: {
        email: ''
      },
      signinRules: {
        email: [{ required: true, trigger: 'blur' }]
      },
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    async handleReset() {
      try {
        await this.$refs.signinForm.validate()
        await firebase.auth().sendPasswordResetEmail(this.signinForm.email)
        this.$router.push({ path: this.redirect || '/' })
      } catch (err) {
        Message.error(err)
      }
    },
    async githubSignin() {
      try {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope('repo')
        await firebase.auth().signInWithPopup(provider)
        this.$router.push({ path: this.redirect || '/' })
      } catch (err) {
        Message.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}

.group-head {
  display: flex;
  flex-direction: row;
  justify-self: stretch;
  margin: 15px;
  color: hsla(215.68,14.98%,51.57%,100%);
}

.group-head::before, .group-head::after {
  flex: 1;
  align-self: center;
  height: 1px;
  background: currentColor;
  content: " ";
  opacity: 0.3;
}

.group-head > * {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.footer {
  border-top: 1px solid hsla(214.29,31.82%,91.37%,100%);
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 22px;
  --u_lh: 22px;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  color: hsla(218.00,16.85%,34.90%,100%);
  margin-bottom: -0.5rem;
}

.right {
  margin-left: auto;
}

.link {
  color: hsla(210.68,60.73%,42.94%,100%);
  text-decoration: underline;
}
</style>
