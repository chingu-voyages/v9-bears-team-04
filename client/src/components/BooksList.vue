<template>
  <div class="bookList">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs4 image text-md-left font-weight-bold>
          <v-treeview :items="items"></v-treeview>
        </v-flex>
        <v-flex xs8>
          <Book/>
          <Book/>
          <Book/>
          <v-fab-transition>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
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
    items: [
      {
        id: 1,
        name: 'All Books :',
        children: [
          { id: 2, name: 'Unleash the dragon by Norman Powell' },
          { id: 3, name: 'Code For You by Widderman Lee' },
          { id: 4, name: 'Счастливые люди Ростова' }
        ]
      },
      {
        id: 15,
        name: 'Targets :',
        children: [
          { id: 16, name: 'October : pdf' },
          { id: 17, name: 'November : pdf' },
          { id: 18, name: 'Tutorial : html' }
        ]
      }
    ]
  })
}
</script>

<style scoped>
  .bookList{
    background-color: rgb(171, 217, 248) !important;
  }
  .image{
    background-image: url("../assets/background.png");
    background-position: top;
    background-size: contain;
  }
  .v-treeview-node__label{
    font-size: 30px !important;
  }
</style>
