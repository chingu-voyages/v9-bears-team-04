<template>
  <div id="app">
    <v-app>
      <Navbar/>
      <router-view/>
      <Footer />
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      :color="snackbarColor"
      primary
    >
      {{ snackbarText }}
      <v-btn
        color="white"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/elements/Navbar'
import Footer from './components/elements/Footer'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000
    }
  },
  computed: mapGetters(['snackbar', 'snackbarText', 'snackbarColor'])
}
</script>

<style>
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
