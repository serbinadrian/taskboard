<template>
  <div class="profile-dropdown">
    <div class="profile-dropdown-header">
      <div class="profile-dropdown-title">
        Account
      </div>
    </div>
    <div class="line"></div>

    <div class="profile-holder">
      <div class="profile-image">
        <img src="./../../../resources/img/render/logo.png" alt="">
      </div>
      <div class="profile-content">
        <div class="username">
          {{currentUser.username}}
        </div>
        <div class="user-email">
          {{currentUser.email}}
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="profile-action" @click="setCurrentHomeComponent('Boards')">
      Boards
    </div>

    <div class="line"></div>

    <div class="profile-action" @click="logout(); setCurrentHomeComponent('SignIn')">
      Logout
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "ProfileDropdown",
  created(){

  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    ...mapMutations(['setCurrentHomeComponent', 'logout'])
  }
}
</script>

<style scoped>
.profile-dropdown{
  position: absolute;
  right: 0;
  transform: translateY(70%);
  z-index: 50;
  color: #5B5B5B;
  width: 350px;
  padding: 15px;
  background: #F1F1F1;
  border-radius: 5px;
  border: 1px solid darkgray;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.profile-dropdown-header{
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
}

.profile-dropdown-title{
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.05em;
}

.profile-dropdown-cancel{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
}

.profile-dropdown-cancel svg {
  width: 100%;
  height: 100%;
  stroke: black;
}

.profile-dropdown-cancel:hover svg{
  stroke: #00aaee;
}

.line{
  margin: 0 !important;
  height: 1px;
  width: 100%;
  background: #5b5b5b;
}

.profile-dropdown input{
  padding-left: 20px;
  margin-bottom: 35px;
}

.profile-holder{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  height: 80px;
  align-items: center;
}

.profile-image{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image img{
  width: 100%;
  height: 100%;
}

.profile-content{
  margin-left: 10px;
  letter-spacing: 0.05em;
  color: #5B5B5B;
}

.username{
  font-size: 18px;
  line-height: 21px;
}

.user-email{
  font-size: 12px;
  line-height: 14px;
}

.profile-action{
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.05em;
  color: #5B5B5B;
}
.profile-action:hover{
  color: #00aaee;
  cursor: pointer;
}
</style>