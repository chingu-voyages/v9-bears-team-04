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

app.listen(process.env.PORT || 8081)
