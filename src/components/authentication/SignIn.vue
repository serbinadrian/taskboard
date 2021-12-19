<template>
  <div class="sign-in">
    <div class="sign-in-form">
      <div class="sign-in-form-header">
        Sign In
      </div>
      <div class="line"></div>
      <form action="">
        <input type="text" placeholder="E-mail" v-model="credentials.login">
        <input type="password" placeholder="Password" v-model="credentials.password">
        <button @click="signIn(credentials)">
          Log in
        </button>
      </form>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "SignIn",
  data(){
    return {
      credentials: {
        login: '',
        password: ''
      }
    }
  },
  created() {
    alert('press log in');
  },
  methods: {
    ...mapActions(['signIn']),
  }
}
</script>

<style>
  .sign-in{
    width: 100%;
    height: 100%;
    background: url("./../../../resources/img/background/auth_back.png");
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign-in-form{
    padding: 50px;
    width: 400px;
    background: #FFFFFF;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  .sign-in-form-header{
    width: 100%;
    text-align: center;
    font-size: 20px;
  }

  .sign-in-form form{
    width: 100%;
  }

  .sign-in-form input{
    font-size: 20px;
    padding-left: 25px;
    margin-bottom: 25px;
    display: block;
    width: 100%;
    height: 50px;
    background: #F9F9F9;
    border: 1px solid rgba(53, 53, 53, 0.5);
    box-sizing: border-box;
    border-radius: 5px;
  }

  .sign-in-form input:focus{
    outline: 2px solid #6B9ED5;
  }

  .sign-in-form button{
    width: 100%;
    height: 30px;
    background: #6B9ED5;
    border: 1px solid rgba(53, 53, 53, 0.5);
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
    color: white;
  }

  .line{
    height: 1px;
    background: #353535;
    margin-top: 25px;
    margin-bottom: 25px;
  }
</style>