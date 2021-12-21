<template>
  <div class="navbar">
    <div class="navbar-elements-holder" v-if="isSignedIn">
      <div class="navbar-icon-holder boards-selector-holder">
        <div class="boards-selector-text">Boards</div>
        <div class="boards-selector">
          <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L10.5 11L19 2"/>
          </svg>
        </div>
      </div>
      <div class="navbar-icon-holder boards-search-holder">
        <input type="search" placeholder="Search">
      </div>
      <div class="navbar-icon-holder user-notifications-holder">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M427.68,351.43C402,320,383.87,304,383.87,217.35,383.87,138,343.35,109.73,310,
              96c-4.43-1.82-8.6-6-9.95-10.55C294.2,65.54,277.8,48,256,48S217.79,65.55,212,85.47c-1.35,
              4.6-5.52,8.71-9.95,10.53-33.39,13.75-73.87,41.92-73.87,121.35C128.13,304,110,320,84.32,351.43,73.68,
              364.45,83,384,101.61,384H410.49C429,384,438.26,364.39,427.68,351.43Z"
              class="svg-default"/>
          <path d="M320,384v16a64,64,0,0,1-128,0V384" class="svg-default"/>
        </svg>
      </div>
      <div class="navbar-icon-holder current-profile-holder" @click="isProfileDropdown = !isProfileDropdown">
        <img src="../../../resources/img/render/logo.png" alt=""/>
        <ProfileDropdown v-if="isProfileDropdown"/>
      </div>
    </div>
    <div class="navbar-elements-holder" v-if="!isSignedIn">
      <div class="authentication-buttons">
        <div class="authentication-button sign-in" @click="setCurrentHomeComponent('SignIn')">
          ВХОД
        </div>
        <div class="authentication-button sign-up" @click="setCurrentHomeComponent('SignUp')">
          РЕГИСТРАЦИЯ
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import ProfileDropdown from "./../dropdown/ProfileDropdown.vue"
export default {
  name: "Navbar",
  data(){
    return{
      isProfileDropdown: false
    }
  },
  computed: {
    ...mapState(['isSignedIn'])
  },
  methods: {
    ...mapMutations(['setCurrentHomeComponent'])
  },
  components: {
    ProfileDropdown
  }
}
</script>

<style>
.navbar {
  width: 100%;
  background: var(--default-navbar-color);
  height: var(--navbar-height);
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}

.navbar-elements-holder{
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
}

.navbar-icon-holder {
  height: var(--default-navbar-icon-dimensions);
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
}

.boards-selector-holder {
  margin-left: 70px;
  margin-right: auto;
}

.boards-selector-text {
  font-size: 1.875rem;
  color: var(--default-upper-font-color);
}

.boards-selector {
  margin-left: 5px;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.boards-selector path {
  stroke: var(--default-upper-font-color);
  stroke-width: 2;
}

.boards-search-holder {
  margin-right: 30px;
}

.boards-search-holder input {
  background: var(--default-search-background-color);
  color: var(--default-upper-font-color);
  font-size: 1.5rem;
  border-radius: 5px;
  width: 400px;
  height: 50px;
  border: none;
  padding-left: 20px;
}

.boards-search-holder input:focus {
  outline: none;
}

.boards-search-holder svg {
  fill: var(--default-upper-font-color);
}

.user-notifications-holder {
  margin-right: 30px;
  width: 50px;
}

.user-notifications-holder svg {
  height: 80%;
  width: 80%;
}

.user-notifications-holder:hover .svg-default {
  fill: white;
}

.svg-default {
  stroke: var(--default-upper-font-color);
  fill: none;
  stroke-width: 20;
}

.current-profile-holder {
  position: relative;
  margin-right: 60px;
  width: 50px;
}

.current-profile-holder img {
  width: 100%;
}

.authentication-buttons{
  margin-left: auto;
  margin-right: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
}

.authentication-button{
  background: none !important;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 22px;
}
.authentication-button:hover{
  cursor: pointer;
  color: #c2e2df;
}

</style>