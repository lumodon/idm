const fs = require('fs')
const express = require('express')
const routes = require('./routes')
const utils = require('./utils')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use('/public', require('./utils/publicLoader'))

utils(app)
routes(app)

app.use( (error, request, response, next) => {
  if(error){
    console.error(error)
    response.send(error)
  }
  response.renderHTML('error')
})

app.listen(3003, () => {
  console.log("http://localhost:3003/")
})