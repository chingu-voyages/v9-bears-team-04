const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var firebase = require('firebase-admin')
var serviceAccount = require('./book-store-7dc95-firebase-adminsdk-modx9-89845da127')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://book-store-7dc95.firebaseio.com'
})

var db = firebase.database()
var ref = db.ref('tables')

var usersRef = ref.child('users')
usersRef.set({
  user1: {
    date_of_birth: 'June 23, 1912',
    full_name: 'Alan Turing'
  },
  user2: {
    date_of_birth: 'December 9, 1906',
    full_name: 'Grace Hopper'
  }
})

app.post('/api/v1/auth/google', (req, res) => {
  // user
  const user = req.body
  // persist user to DB -- if user does not exists
  // console.log(user)
  db.ref('tables').ref('users/ ' + user.uid).set({
    full_name: user.displayName,
    photoURL: user.photoURL,
    email: user.email
  })
})

app.listen(process.env.PORT || 8081)
