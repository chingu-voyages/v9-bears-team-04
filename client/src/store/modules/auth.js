import axios from 'axios'
import firebase from 'firebase'
import * as config from '../../../app-config'
import { AUTHENTICATED, FETCH_USER, LOGOUT, SNACKBAR } from '../mutation-types'
import Router from '../../router'

let isAuthenticated = localStorage.getItem('access_token') !== null
const state = {
  user: {},
  isAuthenticated: isAuthenticated,
  token: localStorage.getItem('access_token'),
  snackbar: false,
  snackbarText: '',
  snackbarColor: ''
}

const getters = {
  authUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated,
  snackbar: state => state.snackbar,
  snackbarText: state => state.snackbarText,
  snackbarColor: state => state.snackbarColor
}

const actions = {
  initFirebase () {
    const firebaseConfig = {
      apiKey: config.FIREBASE_APIKEY,
      authDomain: config.FIREBASE_AUTHDOMAIN,
      databaseURL: config.FIREBASE_DATABASE_URL,
      projectId: config.FIREBASE_PROJECT_ID,
      storageBucket: config.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.FIREBASE_MESSAGING_SENDERID,
      appId: config.FIREBASE_APPID
    }
    // initialize firebase app
    firebase.initializeApp(firebaseConfig)
  },

  googleAuth ({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {
    // The signed-in user info.
      const user = result.user
      if (result.additionalUserInfo.isNewUser) {
        axios.post('http://localhost:8081/api/v1/auth/google', user)
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log('ERROR ' + err)
          })
      }
      // commit state change
      commit(AUTHENTICATED)
      commit(FETCH_USER, user)
      // save access token to localstorage
      localStorage.setItem('access_token', user.ra)
      commit('SNACKBAR', {
        snackbar: true,
        text: 'Welcome',
        color: 'success'
      })
      // redirect to authenticated page
      Router.push({name: 'Home'})
    }).catch(function (error) {
      console.log('ERROR ' + error.message)
    })
  },

  logout ({ commit }) {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      commit(LOGOUT)
      commit('SNACKBAR', {
        snackbar: true,
        text: 'Logged Out Successfully',
        color: 'success'
      })
      localStorage.removeItem('access_token')
      Router.push({
        name: 'Home'
      })
    }).catch((error) => {
      console.log('ERROR ' + error)
    })
  }
}

const mutations = {
  [AUTHENTICATED] (state) {
    // mutate state
    state.isAuthenticated = true
  },
  [FETCH_USER] (state, user) {
    // mutate state
    state.user = user
  },
  [LOGOUT] (state) {
    // mutate state
    state.isAuthenticated = false
  },
  [SNACKBAR] (state, payload) {
    state.snackbar = payload.snackbar
    state.snackbarText = payload.text
    state.snackbarColor = payload.color
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
