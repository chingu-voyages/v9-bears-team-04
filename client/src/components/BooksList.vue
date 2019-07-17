<template>
  <div class="bookList primary">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs4 image text-md-left font-weight-bold>
          <v-treeview :items="books"></v-treeview>
        </v-flex>
        <v-flex xs8>
          <Book v-for="item in books" v-bind:key="item.title" :book=item />
          <v-dialog v-model="dialog" persistent max-width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="red"
                      dark
                      relative
                      bottom
                      left
                      fab
                      v-on="on"
                      style="left: 325px;"><v-icon>add</v-icon></v-btn>
              <!-- <v-fab-transition>
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
              </v-fab-transition> -->
            </template>
            <v-card>
              <v-card-title class="headline">Add Book to Reading List</v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Book Title"
                        outline
                        single-line
                        hint="eg Game of thrones"
                        persistent-hint
                        required
                        v-model="title"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Genre"
                        outline
                        single-line
                        hint="eg Ficton,action"
                        persistent-hint
                        v-model="genre"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Author"
                        outline
                        single-line
                        hint="eg JK Rowlings"
                        persistent-hint
                        v-model="author"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        type="number"
                        label="Year"
                        outline
                        single-line
                        hint="eg 2019"
                        persistent-hint
                        v-model="year"
                        required
                      ></v-text-field>
                    </v-flex>
                    <!-- <h5>Reading Goals</h5> -->
                    <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        clearable
                        label="Finish Date"
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
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        type="number"
                        label="Page Per Day"
                        outline
                        single-line
                        hint="eg 20"
                        persistent-hint
                        v-model="pages_per_day"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        type="text"
                        label="Comment"
                        outline
                        single-line
                        hint="eg I will finish in time for the worldcup!"
                        persistent-hint
                        v-model="comment"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" round @click="dialog = false">Close</v-btn>
                <v-btn color="primary darken-1" round v-on:click="addNewBook" :loading="isLoading">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-flex xs12>
            <div v-if="books.length === 0"><h1>There is no books in your Book Store yet! Add them!</h1></div>
          </v-flex>
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
    books: [],
    dialog: false,
    menu1: false,
    title: '',
    genre: '',
    author: '',
    year: '',
    pages_per_day: '',
    comment: '',
    isLoading: false,
    date: new Date().toISOString().substr(0, 10)
  }),
  created: async function () {
    await this.fetchBooksForCurrentUser()
    await this.getAllBooksForCurrentUser()
  },
  methods: {
    async fetchBooksForCurrentUser () {
      // token now is the userID
      await this.$store.dispatch('fetchBooks', {'userID': this.$store.getters.token})
    },
    getAllBooksForCurrentUser () {
      this.books = this.$store.getters.getBooks
    },
    async addNewBook () {
      this.isLoading = true
      // dispatch store action
      let payload = {
        title: this.title,
        genre: this.genre,
        author: this.author,
        pages_per_day: this.pages_per_day,
        comment: this.comment,
        date: this.date,
        year: this.year
      }
      await this.$store.dispatch('addBook', payload)
      this.loading = false
      this.dialog = false
      this.title = ''
      this.genre = ''
      this.author = ''
      this.comment = ''
      this.year = ''
      this.pages_per_day = ''
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
