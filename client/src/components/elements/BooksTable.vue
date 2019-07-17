<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>BOOK LIST</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="pink lighten-1" dark class="mb-2" v-on="on">New Book</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.author" label="Author"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="books"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.author }}</td>
        <td class="text-xs-right">{{ props.item.status }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'BooksTable',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Title',
        align: 'left',
        value: 'title'
      },
      { text: 'Author', value: 'author' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'title', sortable: false }
    ],
    books: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      author: '',
      status: ''
    },
    defaultItem: {
      title: '',
      author: '',
      status: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.books = [
        {
          title: 'Book 1',
          author: 'Author 1',
          status: 'Will read later'
        },
        {
          title: 'Book 2',
          author: 'Author 2',
          status: 'Will read later'
        },
        {
          title: 'Book 3',
          author: 'Author 3',
          status: 'Will read later'
        },
        {
          title: 'Book 4',
          author: 'Author 4',
          status: 'Will read later'
        },
        {
          title: 'Book 5',
          author: 'Author 5',
          status: 'Will read later'
        },
        {
          title: 'Book 6',
          author: 'Author 6',
          status: 'Will read later'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.books.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.books.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem)
      } else {
        this.books.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
<style scoped>
.custom1 {
  border: solid red 2px;
}
</style>
