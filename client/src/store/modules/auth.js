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
  snackbarColor: state => state.snackbarColor,
  token: state => state.token
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
      // save access token to localstorage which is the userID
      localStorage.setItem('access_token', user.uid)
      commit('SNACKBAR', {
        snackbar: true,
        text: 'Welcome',
        color: 'success'
      })
      // redirect to authenticated page
      Router.push({name: 'Home'})
    }).catch(function (error) {
      commit('SNACKBAR', {
        snackbar: true,
        text: 'oops we could not process your request due to' + error.message,
        color: 'success'
      })
    })
  },

  register ({ commit }, user) {
    // create user account
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        user.uid = response.user.uid
        axios.post('http://localhost:8081/api/register', user)
          .then(() => {
            commit('SNACKBAR', {
              snackbar: true,
              text: 'Registeration Successful',
              color: 'success'
            })
            Router.push({
              name: 'Login'
            })
          })
          .catch((error) => {
            commit('SNACKBAR', {
              snackbar: true,
              text: 'We could not save your details due to' + error.message,
              color: 'error'
            })
          })
      })
      .catch(function (error) {
        commit('SNACKBAR', {
          snackbar: true,
          text: `Error Code ${error.code} caused by ${error.message}`,
          color: 'error'
        })
      })
  },

  login ({ commit }, user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        commit(AUTHENTICATED)
        commit(FETCH_USER, user)
        // save access token to localstorage
        localStorage.setItem('access_token', response.user.ra)
        commit('SNACKBAR', {
          snackbar: true,
          text: 'Welcome!',
          color: 'success'
        })
        Router.push({
          name: 'BooksList'
        })
      })
      .catch(function () {
        commit('SNACKBAR', {
          snackbar: true,
          text: 'email or password incorrect!',
          color: 'error'
        })
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
