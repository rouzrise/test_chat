const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:7bde51ee-52e3-4ccb-89c2-9e0f02f397a9',
  key: '148f8759-204a-4184-9350-0887e0e90428:kRFzlVPsITVQEt3JoB3Hi1vmljStABHBdURFqTn0hCo='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const {username} = req.body

  chatkit
  .createUser({
    name: username,
    id: username
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
    if (error.error_type === 'services/chatkit/user/user_already_exists') {
      res.sendStatus(200)
    } else {
      res.status(error.statusCode).json(error)
    }
  })
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
