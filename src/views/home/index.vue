<template>
  <div>
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
    <div class="home">
      <div class="imgc" style="background-color:#E8F0FE">
        <!-- <img src="//www.gstatic.com/images/icons/material/system_gm/1x/home_gm_blue_24dp.png" class="img"> -->
        <i class="el-icon-s-home img" />
      </div>
      <div class="textc">
        <div class="text">Home</div>
        <div class="text loc">{{ location }} <span class="edit" @click="locDialog = true">EDIT</span></div>
      </div>
    </div>
    <div class="areac">
      <div class="titlec">
        <h1 class="title">Search this area</h1>
      </div>
      <div class="buttons">
        <router-link to="/jobs" class="button">
          <div class="icon" style="background-color: #188038;">
            <i class="el-icon-lollipop image" />
          </div>
          <div class="type">
            Jobs
          </div>
        </router-link>
        <router-link to="/companies" class="button">
          <div class="icon" style="background-color: #129EAF;">
            <i class="el-icon-ship image" />
          </div>
          <div class="type">
            Company
          </div>
        </router-link>
        <router-link to="/users" class="button">
          <div class="icon" style="background-color: #C5221F;">
            <i class="el-icon-user image" />
          </div>
          <div class="type">
            Users
          </div>
        </router-link>
      </div>
    </div>
    <el-dialog
      title="Set Location"
      :visible.sync="locDialog"
      width="30%"
      :center="true"
    >
      <label>
        <gmap-autocomplete
          placeholder="input your location"
          @place_changed="setPlace"
        />
      </label>
      <span slot="footer" class="dialog-footer">
        <el-button @click="locDialog = false">Cancel</el-button>
        <el-button type="primary" @click="locDialog = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      jobs: [],
      text: '',
      place: null,
      location: 'Set Location',
      locDialog: false
    }
  },
  methods: {
    setPlace(place) {
      console.log(place)
      this.location = place.formatted_address
      this.locDialog = false
    },
    submit() {
      this.$router.push({ path: '/jobs', query: { q: this.text }})
    }
  }
}
</script>
<style lang="scss">
.pac-logo:after {
  display: none;
}
.pac-container {
  z-index: 3000;
}
.pac-target-input {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 1px 0 15px;
}

.omibox {
  margin: 8px 8px 8px 8px
}

.home {
  padding: 12px 24px;
  overflow-wrap: break-word;
  display: flex;
  flex: 1;
  text-align: left;
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  cursor: pointer;
}

.home:hover {
  background-color: rgba(0,0,0,.03);
}

.imgc {
  height: 36px;
  width: 36px;
  position: relative;
  left: -4px;
  top: 0;
  border-radius: 18px;
  transform: none;
  -webkit-transform: none;
  background: transparent;
  margin-right: 10px;
}

.img {
  position: relative;
  top: 9px;
  left: 9px;
  color: #1A73E8;
}

.edit {
  float: right;
  color: #1A73E8;
  font-size: 12px;
}

.areac {
  border-bottom: 1px solid #E8EAED;
  border-top: 1px solid #E8EAED;
  margin-top: 8px;
  position: relative;
  background-color: #fff;
}

.loc {
  color: #70757A;
}

.textc {
  display: flex;
  flex-direction: column;
  width: 90%;
}

.title {
  font-weight: 500;
  font-size: 15px;
  overflow: hidden;
  padding: 10px 20px;
  text-overflow: ellipsis;
}

.buttons {
  padding: 4px 11px;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  min-height: 100px;
  padding: 4px 19px;
}

.button {
  display: flex;
  flex-direction: column;
  padding-bottom: 11px;
  width: 74px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.button:hover {
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.87);
  background-color: rgba(0,0,0,.03);
}

.icon {
  border-radius: 50%;
  box-sizing: border-box;
  float: left;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 13px;
  width: 48px;
  height: 48px;
}

.image {
  color: #fff;
  font-size: 16px;
}

.type {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  word-spacing: 0.3px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
