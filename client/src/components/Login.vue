<template>
  <div class="login">
    <div class="login__form">
      <input type="email" class="form-control" v-model="email" placeholder="Email">
      <input type="password" class="form-control" v-model="password" placeholder="Password">
      <button class="btn btn-login" v-on:click="Login">Login</button>
      <div class="social">
        <button class="btn btn-google" v-on:click="googleAuth">Login with Google</button>
        <!-- <button class="btn btn-facebook" v-on:click="facebookAuth">Login with Facebook</button> -->
      </div>
      <div>{{isAuthenticated}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    // call the init firebase from store
    this.$store.dispatch('initFirebase')
  },
  methods: {
    ...mapActions(['googleAuth']),

    Login () {
      // alert('Click Event for Login Worked!')
      // firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      //   .then((result) => {
      //     console.log(result)
      //   })
      //   .catch((error) => {
      //     console.log('ERROR ' + error.message)
      //   })
    }
  },
  computed: mapGetters(['authUser', 'isAuthenticated'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    padding-right: 40px;
    padding-left: 40px;
    display: flex;
    justify-content: center
  }
  .login__form{
    width: 400px;
  }
  .login__form input{
    /* flex: 1 1 100%; */
    margin-bottom: 10px;
  }
  .btn{
    border: none;
    padding: 1em 1.5em;
    box-shadow: #ced4da;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-login{
    margin-top: 1em;
    background-color: #060606;
    color: #FFF;
  }
  .social{
    margin-top: 1em;
  }
  .btn-google{
    background-color: #D34836;
    color: #FFF;
  }

  .btn-facebook{
    background-color: #4267B2;
    color: #FFF;
  }

  .form-control{
    display: block;
    width: 100%;
    padding: 0.875rem 1.375rem;
    font-size: 1rem;
    line-height: 1;
    color: #495057;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 2px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>
