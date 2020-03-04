const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/config.js')
const axios = require('axios')

const router = express.Router()

router.post('/register', passport.authenticate('register',
  {
    session: false
  }), async (req, res, next) => {

  res.json({
    message: 'Signup successful',
    user: req.user
  })
})

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err || !user) {
        return next(err)
      }
      req.login(user,
        {
          session: false
        }, async (error) => {

        if(error) {
          return next(error)
        }
        return res.json(
          {
            user: user,
            token: info.jwt
          }
        )
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

router.get('/article/:article_title', async (req, res, next) => {
  try {
    axios.get(config.DB_URL + 'blog-articles?q={"article_title":"' + req.params.article_title + '"}').then(data => {
      return res.json({
        message: 'Article found',
        data: data.data
      })
    }).catch(err => {
      return res.json({
        message: 'No article found',
        error: err
      })
    })
  } catch (error) {
    next(error)
  }
})

router.get('/articles', async (req, res, next) => {
  try {
    axios.get(config.DB_URL + "blog-articles").then(data => {
      return res.json({
        message: 'Articles found',
        articles: data.data
      })
    }).catch(err => {
      return res.json({
        message: 'No articles found',
        error: err
      })
    })
  } catch (error) {
    done(error)
  }
})

module.exports = router
