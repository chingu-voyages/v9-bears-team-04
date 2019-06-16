const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

// var usersRef = ref.child('users')
// usersRef.set({
//   user1: {
//     date_of_birth: 'June 23, 1912',
//     full_name: 'Alan Turing'
//   },
//   user2: {
//     date_of_birth: 'December 9, 1906',
//     full_name: 'Grace Hopper'
//   }
// })

app.listen(process.env.PORT || 8081)
