import firebase from 'firebase'
import * as config from '../app-config'

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
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
