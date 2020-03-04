const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
const config = require('../config/config.js')

app.use(bodyParser.json())

router.get('/testSecuredRoute', (req, res, next) => {
  res.json({
    message : 'You made it to the secure route'
  })
});

router.post('/articles', async (req, res, next) => {
  try {
    const article = {
      article_title: req.body.article_title,
      article_body: req.body.article_body,
      article_date: req.body.article_date
    }

    await axios.post(config.DB_URL + "blog-articles", article).then(data => {
      return res.json({
        message : 'Article Successfully created',
        article: data.data
      })
    }).catch(err => {
      return res.json({
        message : 'Article creation failed',
        error: err
      })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
