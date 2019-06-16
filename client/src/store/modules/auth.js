import axios from 'axios'
import firebase from 'firebase'
import * as config from '../../../app-config'
import { AUTHENTICATED, FETCH_USER, LOGOUT } from '../mutation-types'
import Router from '../../router'

const state = {
  user: {},
  isAuthenticated: false,
  token: localStorage.getItem('access_token')
}

const getters = {
  authUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated
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
    // alert('Click Event for Google Worked!')
    firebase.auth().signInWithPopup(provider).then(function (result) {
    // The signed-in user info.
      const user = result.user
      // console.log(user)
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
      // redirect to authenticated page
      Router.push({name: 'Home'})
    }).catch(function (error) {
      console.log('ERROR ' + error.message)
    })
    // console.log('I am here now!')
  },

  logout ({ commit }) {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      commit(LOGOUT)
      Router.push({
        name: 'Login'
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
