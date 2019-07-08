<template>
  <div class="bookList primary">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs4 image text-md-left font-weight-bold>
          <v-treeview :items="books"></v-treeview>
        </v-flex>
        <v-flex xs8>
            <Book v-for="item in books" v-bind:key="item.title" :book=item />
          <v-fab-transition>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="red"
                  dark
                  relative
                  bottom
                  left
                  fab
                  v-on="on"
                  style="left: 325px;"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>Add New Book to your List</span>
            </v-tooltip>
          </v-fab-transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Book from './elements/Book'

export default {
  name: 'BooksList',
  components: {
    Book
  },
  data: () => ({
    books: []
  }),
  created: async function () {
    await this.fetchBooksForCurrentUser()
    await this.getAllBooksForCurrentUser()
  },
  methods: {
    async fetchBooksForCurrentUser () {
      await this.$store.dispatch('fetchBooks', {'userID': this.$store.getters.authUser.uid})
    },
    getAllBooksForCurrentUser () {
      this.books = this.$store.getters.getBooks
    }
  }
}
</script>

<style scoped>
  .image{
    background-image: url("../assets/background.png");
    background-position: top;
    background-size: contain;
  }
  .v-treeview-node__label{
    font-size: 30px !important;
  }
</style>
