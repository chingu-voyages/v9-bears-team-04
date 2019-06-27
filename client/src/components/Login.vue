<template>
  <div class="login">
    <div class="login__form">
      <h1 class="text">BOOK STORE</h1>
      <v-flex xs12 sm12 md12>
          <v-text-field
            label="Email"
            single-line
            outline
            v-model="email"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-text-field
            type="password"
            label="Password"
            single-line
            outline
            v-model="password"
          ></v-text-field>
        </v-flex>
      <v-btn color="primary" v-on:click="Login" large>Login</v-btn>
      <div class="social">
        <v-btn color="error" v-on:click="googleAuth" large><v-icon left dark>fa fa-google</v-icon>Login With Google</v-btn>
      </div>
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
<style>
  .login{
    padding-right: 40px;
    padding-left: 40px;
    display: flex;
    justify-content: center;
    height: 80vh;
    align-items: center;
    /* background-color: rgb(171, 217, 248) !important; */
    background-image: url('../assets/background.png');
    background-position: center;
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
  .text{
    margin-bottom: 1em;
  }

</style>
