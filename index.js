const express = require('express')
const config = require('./config/config.js')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const passport = require('passport')

const routes = require('./routes/routes.js')
const secureRoute = require('./routes/secureRoutes.js')

require('./auth/auth.js')

app.use(bodyParser.json())

axios.interceptors.request.use((conf) => {
  conf.headers = {
    "x-apikey": config.API_KEY
  }
  return conf
})

app.use('/', routes);
app.use('/secure', passport.authenticate('jwt', {session: false}), secureRoute);

app.listen(config.PORT, function () {
  console.log("LE SERVER EST PRET")
})
