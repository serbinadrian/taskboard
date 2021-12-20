<template>
  <div class="main">
    <Navbar/>
    <component :is="currentHomeComponent"></component>
  </div>
</template>

<script>
import Navbar from './navbar/Navbar.vue'
import Boards from './boards/Boards';
import Board from './board/Board.vue'
import SignIn from './authentication/SignIn.vue'
import SignUp from './authentication/SignUp.vue'
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {};
  },
  created() {

  },
  methods: {},
  computed: {
    ...mapState(['isSignedIn', 'currentHomeComponent'])
  },
  components: {
    SignIn,
    SignUp,
    Navbar,
    Board,
    Boards
  }
};
</script>

<style>

:root {
  /****navbar************/
  --navbar-height: 70px;
  --board-header-height: 100px;
  --default-navbar-icon-dimensions: 50px;
  /****board header************/
  --default-board-header-elements-dimensions: 40px;
  /****cards************/
  --default-card-width: 350px;
  --card-holder-width-default: 400px;
  /****colors light theme************/
  --default-upper-font-color: #FFFFFF;
  --default-search-background-color: rgba(235, 236, 240, 0.5);
  --default-board-header-elements-color: rgba(235, 236, 240, 0.5);
  --default-background-board-content-color: rgba(241, 241, 241, 0.95);
  --default-background-card-color: #FFFFFF;
  --default-card-title-color: #515151;
  --default-navbar-color: rgba(83, 83, 83, 0.5);
  --default-vertical-delimiter: #FFFFFF;
}

.main {
  background: url("../../resources/img/background/back.png");
  background-size: cover;
  scrollbar-width: thin;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}



</style>
