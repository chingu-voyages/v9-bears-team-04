const express = require('express')
const router = express.Router()
const firebase = require('firebase-admin')
const serviceAccount = require('../book-store-7dc95-firebase-adminsdk-modx9-89845da127')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://book-store-7dc95.firebaseio.com'
})

var db = firebase.database()
// var ref = db.ref('tables')

router.get('/', (req, res) => {
  return res.status(200).send({
    success: true,
    message: 'Request Recieved!!!'
  })
})

router.post('/api/v1/auth/google', (req, res) => {
  // user
  const user = req.body
  // persist user to DB -- if user does not exists
  // console.log(user)
  db.ref('tables').child('users/ ' + user.uid).set({
    full_name: user.displayName,
    photoURL: user.photoURL,
    email: user.email
  })
  return res.status(200).send({
    success: true,
    message: 'User saved!'
  })
})

router.post('/api/books-list', (req, res) => {
  // book
  const book = req.body

  db.ref('tables').child('books/').push({
    title: book.title,
    author: book.author,
    year: book.year
  })
  return res.status(200).send({
    success: true,
    message: 'Book saved!'
  })
})

router.post('/api/user-book-rel', (req, res) => {
  const rel = req.body
  console.log(rel)

  db.ref('tables').child('relations/').push({
    userID: rel.userID,
    bookID: rel.bookID,
    status: rel.status
  })
  return res.status(200).send({
    success: true,
    message: 'Relation saved!'
  })
})

module.exports = router
