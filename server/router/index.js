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

router.post('/api/register', (req, res) => {
  // save user details to user table
  db.ref('tables').child('users/ ' + req.body.uid).set({
    full_name: req.body.name,
    email: req.body.email,
    date_of_birth: req.body.date
  })
  res.status(200).send({
    success: true,
    message: 'User registered!'
  })
})

// Allow you to add a book and request title, author, year
router.post('/api/books', (req, res) => {
  // book
  const book = req.body

  db.ref('tables').child('books/').push({
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre
  })
  return res.status(200).send({
    success: true,
    message: 'Book saved!'
  })
})

// Allow you to update a book from data base and request bookID new title, new author and new year to replace
router.patch('/api/books', (req, res) => {
  var requestedBookID = req.body.bookID

  db.ref('tables/books/' + requestedBookID).update({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre
  })
  return res.status(200).send({
    success: true,
    message: 'Book has been updated!'
  })
})

// Allow you to delete a book from data base and request you to send bookID
router.delete('/api/books', (req, res) => {
  var requestedBookID = req.body.bookID

  db.ref('tables/books/' + requestedBookID).remove()
  return res.status(200).send({
    success: true,
    message: 'Book deleted'
  })
})

// Allow you to add a relation between the book and the user and request userID, bookID and status
router.post('/api/user-book-rel', (req, res) => {
  const rel = req.body

  db.ref('tables').child('relations/').push({
    userID: rel.userID,
    bookID: rel.bookID,
    status: rel.status,
    comment: rel.comment,
    pagesPerDay: rel.pagesPerDay,
    finishDate: rel.finishDate
  })
  return res.status(200).send({
    success: true,
    message: 'Relation saved!'
  })
})

// Allow you to receive book list for the user and request you to send userID
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

// Allow you to delete a book to user relation from data base and request you to send bookID and userID
router.delete('/api/user-book-rel', (req, res) => {
  var requestedBookId = req.body.bookID
  var requestedUserID = req.body.userID

  db.ref('tables/relations').once('value').then(function (snapshot) {
    var relations = snapshot.toJSON()

    var relationsKeys = Object.keys(relations)
    relationsKeys.forEach(function (key) {
      if (relations[key].userID === requestedUserID && relations[key].bookID === requestedBookId) {
        db.ref('tables/relations/' + key).remove()
        return res.status(200).send({
          success: true,
          message: 'Relation was deleted'
        })
      }
    })
    return res.status(404).send({
      message: 'There is no such relation'
    })
  })
})

module.exports = router
