<template>
    <div class="login">
        <div class="login__form">
        <h1 class="text pb-3">Register</h1>
        <v-flex xs12 sm12 md12>
            <v-text-field
                type="text"
                label="Full Name"
                single-line
                outline
                v-model="name"
            ></v-text-field>
            <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            full-width
            max-width="290"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                clearable
                label="Date Of Birth"
                outline
                v-on="on"
                v-model="date"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                @change="menu1 = false"
            ></v-date-picker>
            </v-menu>
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
            <v-btn color="primary" v-on:click="register({ name, email, password,date })" large>Register</v-btn>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      date: new Date().toISOString().substr(0, 10),
      menu1: false
    }
  },
  methods: {
    ...mapActions(['register'])
  }
}
</script>
<style>
    .login{
        padding-right: 40px;
        padding-left: 40px;
        display: flex;
        justify-content: center;
        height: 80vh;
        align-items: center;
        /* background-image: url('../assets/background.png'); */
        /* background-repeat: repeat; */
        /* background-position: left; */
    }
    .login__form{
        width: 400px;
    }
</style>
