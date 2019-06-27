<template>
<div class="home">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex xs4 class="text-md-left">
        <h1 class="text-md-left display-4 font-weight-bold">Read More!</h1>
        <p class="headline"><router-link :to="{name:'BooksList'}">Add your first book ></router-link></p>
      </v-flex>
      <v-flex xs8 >
        <div class="home__main">
          <!-- <img src="../assets/bookstore.png" alt="" style="padding: 200px"> -->
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  computed: mapGetters(['authUser', 'isAuthenticated']),
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
  .home{
    /* background-color: rgb(171, 217, 248) !important; */
    height: 80vh;
  }
  div.container{
    height: 100%;
  }
  div.layout{
    height: 100%;
  }
  .router-link-custom {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-transform: none !important;
    text-decoration: none !important;
    color: white;
  }
  div.home__main{
    background-image: url('../assets/background.png');
    background-position: center;
    background-size: contain;
    height: 450px;
  }
  a{
    text-decoration: none !important;
  }
</style>
