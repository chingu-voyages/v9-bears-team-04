import axios from 'axios'
import firebase from 'firebase'
import * as config from '../../../app-config'
import { AUTHENTICATED } from '../mutation-types'

const state = {
  user: {},
  isAuthenticated: false
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
    firebase.auth().signInWithPopup(provider).then((result) => {
    // The signed-in user info.
      this.user = result.user
      console.log(this.user)
      if (result.additionalUserInfo.isNewUser) {
        axios.post('http://localhost:8081/api/v1/auth/google', this.user)
          .then(response => {
            // commit state change
            commit(AUTHENTICATED)
          })
          .catch(err => {
            console.log('ERROR ' + err)
          })
      } else {

      }
    }).catch((error) => {
      console.log('ERROR ' + error.message)
    })
    // console.log('I am here now!')
  }
}

const mutations = {
  [AUTHENTICATED] (state) {
    // mutate state
    state.isAuthenticated = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
