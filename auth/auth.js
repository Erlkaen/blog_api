const config = require('../config/config.js')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// JWT verification middleware
passport.use(new JWTstrategy({
  secretOrKey: config.SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.data)
  } catch (error) {
    done(error)
  }
}))

// Register middleware
passport.use('register', new localStrategy({
  usernameField: 'user_mail',
  passwordField: 'user_password'
}, async (mail, password, done) => {
    try {
      // Crypting password
      let salt = bcrypt.genSaltSync(10)
      let cryptedPassword = bcrypt.hashSync(password, salt)

      // Saving user
      const user = await axios.post(config.DB_URL + "blog-users", {
        user_mail: mail,
        user_password: cryptedPassword
      })

      return done(null, user.data)
    } catch (error) {
      done(error)
    }
}))

// Login middleware
passport.use('login', new localStrategy({
  usernameField: 'user_mail',
  passwordField: 'user_password'
}, async (mail, password, done) => {
  try {
    // Find user
    const user = await axios.get(config.DB_URL + 'blog-users?q={"user_mail":"' + mail + '"}')
    if(!user){
      return done(null, false, {
        message: 'User not found'
      })
    }
    // Password validation
    let isPasswordOK = bcrypt.compareSync(password, user.data[0].user_password)
    let token = jwt.sign({
      data: {
        user: user.data[0]
      }
    }, config.SECRET)

    if(!isPasswordOK){
      return done(null, false, {
        message: 'Wrong Password'
      })
    }

    return done(null, user.data, {
      message: 'Logged in Successfully',
      jwt: token
    })
  } catch (error) {
    return done(error)
  }
}));
