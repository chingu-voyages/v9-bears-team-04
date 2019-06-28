<template>
<div class="home">
  <div class="pl-5">
    <v-layout row wrap align-center>
      <v-flex xs4 class="text-md-left">
        <h1 class="text-md-left display-4 font-weight-bold">Read More!</h1>
        <p class="headline"><router-link :to="{name:'BooksList'}">Add your first book ></router-link></p>
      </v-flex>
      <v-flex xs8 >
        <div class="home__main">
          <div class="home__image">
            <img src="../assets/rsz_bookstore.png" alt="">
          </div>
        </div>
        <div class="home__main__two">
        </div>
      </v-flex>
    </v-layout>
  </div>
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
    height: 100vh;
    background-color: #FFFFFF;
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
    background-repeat: round;
    height: 650px;
    overflow: hidden;
  }
  a{
    text-decoration: none !important;
  }
  div.home__image{
    position: absolute;
    top: 10%;
    left: 40%;
  }
  div.home__image img{
    width: 770px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }

</style>
