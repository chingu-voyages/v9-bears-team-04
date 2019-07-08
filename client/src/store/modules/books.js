import axios from 'axios'

const state = {
  books: {},
  relations: {}
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
