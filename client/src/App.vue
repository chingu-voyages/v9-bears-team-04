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
      class="font-weight-bold"
    >
      {{ snackbarText }}
    </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/elements/Navbar'
import Footer from './components/elements/Footer'
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
      timeout: 6000,
      snackbar: this.$store.getters.snackbar,
      snackbarText: this.$store.getters.snackbarText,
      snackbarColor: this.$store.getters.snackbarColor
    }
  }
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
