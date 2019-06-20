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

router.post('/api/books', (req, res) => {
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

router.post('/api/book-list', (req, res) => {
  var answerBooks = {}
  const requestedUserID = req.body.userID
  db.ref('tables').once('value').then(function (snapshot) {
    var relations = snapshot.child('relations').toJSON()
    var books = snapshot.child('books').toJSON()

    var relationsKeys = Object.keys(relations)
    relationsKeys.forEach(function (key) {
      // Compare userID in a relation we are looking now and userID who requested to get a book list
      if (relations[key].userID === requestedUserID) {
        // Add status of reading process for this exact book for this exact reader to give it back to him
        books[relations[key].bookID].status = relations[key].status
        answerBooks[relations[key].bookID] = books[relations[key].bookID]
      }
    })
    return res.status(200).send({
      books: answerBooks
    })
  })
})

module.exports = router
