import axios from 'axios'

const state = {
  books: {},
  relations: {}
}

const getters = {
  getBooks: state => state.books,
  getRelations: state => state.relations
}

const mutations = {
  setBooks (state, books) {
    state.books = books
  },
  setRelations (state, relations) {
    // mutate state
    state.relations = relations
  }
}

const actions = {
  fetchBooks (context, payload) {
    // TODO Extract all urls to the config file
    axios.post('http://localhost:8081/api/book-list', payload)
      .then(response => {
        let books = response.data.books
        context.commit('setBooks', books)
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
