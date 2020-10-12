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
        <el-button style="width: 300px" type="primary" @click.native.prevent="githubSignin">SIGN IN WITH GITHUB</el-button>
        <div class="group-head">
          <span class="">or with email</span>
        </div>
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
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="signinForm.password"
            placeholder="password"
            name="password"
            :type="passwordType"
            tabindex="1"
            auto-complete="on"
          >
            <span slot="suffix" class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-input>
        </el-form-item>
        <el-button style="width: 300px" type="primary" @click.native.prevent="handleSignin">Sign In</el-button>
        <footer class="footer">
          <span class="">
            New here? <router-link class="link" to="/signup">Sign Up</router-link>
          </span>
          <router-link class="link right" to="/forgot">Forgot password?</router-link>
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
        email: '',
        password: ''
      },
      signinRules: {
        email: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleSignin() {
      try {
        await this.$refs.signinForm.validate()
        await firebase.auth().signInWithEmailAndPassword(this.signinForm.email, this.signinForm.password)
        this.$router.push({ path: this.redirect || '/' })
      } catch (err) {
        Message.error(err)
      }
    },
    async githubSignin() {
      try {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope('repo')
        await firebase.auth().signInWithPopup(provider) // const result =
        // const token = result.credential.accessToken
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
