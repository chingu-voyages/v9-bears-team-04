import axios from 'axios'
import { ADD_BOOK, SNACKBAR } from '../mutation-types'

const state = {
  books: {},
  relations: {},
  book: {},
  isAdded: false
}

const getters = {
  getBooks (state) {
    let books = []
    let bookKeys = Object.keys(state.books)
    for (var i = 0; i < bookKeys.length; i++) {
      state.books[bookKeys[i]].id = bookKeys[i]
      books.push(state.books[bookKeys[i]])
    }
    return books
  },
  getBook (state) {
    return keyword => state.books[keyword]
  }
}

const mutations = {
  setBooks (state, books) {
    state.books = books
  },
  [ADD_BOOK] (state, book) {
    state.book = book
    state.isAdded = true
  }
}

const actions = {
  async fetchBooks (context, payload) {
    // TODO Extract all urls to the config file
    await axios.post('http://localhost:8081/api/book-list', payload)
      .then(response => {
        context.commit('setBooks', response.data.books)
      })
      .catch(error => {
        console.log(error)
      })
  },
  addBook ({ commit, dispatch }, payload) {
    axios.post('http://localhost:8081/api/books', payload)
      .then((response) => {
        commit(ADD_BOOK, response.data.data)
        // dispatch the relations
        dispatch('addBookRelation', response.data.data)
      })
      .catch(() => {

      })
  },
  addBookRelation ({ commit, rootGetters }, payload) {
    console.log(payload)
    let data = {
      bookID: payload.bookID,
      userID: rootGetters.token,
      status: 0,
      pagesPerDay: payload.pagesPerDay,
      finishDate: payload.finishDate,
      comment: payload.comment
    }
    axios.post('http://localhost:8081/api/user-book-rel', data)
      .then(() => {
        commit(SNACKBAR, {
          snackbar: true,
          text: 'Book was added to your reading list',
          color: 'success'
        }, { root: true })
      })
      .catch(() => {

      })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
