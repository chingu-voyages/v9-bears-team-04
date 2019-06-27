<template>
    <v-toolbar color="white">
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-title class="font-weight-bold">
            <router-link
            :to="{ name: 'Home', params: {} }">BOOKSTORE</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat round><router-link
            :to="{ name: 'BooksList', params: {} }"
          >My Book list </router-link></v-btn>
            <v-btn flat round>Targets</v-btn>
            <v-btn flat round>About</v-btn>
            <v-btn v-if="!isAuthenticated" flat round><router-link
            :to="{ name: 'Login', params: {} }">Login</router-link></v-btn>
            <v-menu offset-y v-else>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary account" fab dark v-on="on">
                        <v-icon>account_circle</v-icon>
                    </v-btn>
                </template>
                <v-list class="font-weight-bold">
                    <v-list-tile
                    v-for="(item, index) in items"
                    :key="index"
                    >
                    <v-list-tile-title v-if="item.route"><router-link
            :to="{ name: item.route, params: {} }">{{ item.title }}</router-link></v-list-tile-title>
                    <v-list-tile-title v-else v-on="logout">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Navbar',
  data: () => ({
    items: [
      { title: 'My Books', route: 'BooksList' },
      { title: 'Logout', route: false }
    ]
  }),
  computed: mapGetters(['authUser', 'isAuthenticated']),
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
<style scoped>
.v-toolbar__items .v-btn {
    height: 40px !important;
    font-weight: 600;
}
.v-btn:hover, .v-btn:active{
    background-color: #1976d2;
    color: #FFF;
}
.v-btn.account{
    height: 55px !important;
}
a{
    text-decoration: none;
    color: inherit !important;
}
</style>
