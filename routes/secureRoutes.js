const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
const config = require('../config/config.js')

app.use(bodyParser.json())

router.get('/testSecuredRoute', (req, res, next) => {
  res.json({
    message : 'You made it to the secure route',
    json: req.data
  })
});

router.post('/articles', async (req, res, next) => {
  try {
    let article = {
      article_title: req.body.article_title,
      article_body: req.body.article_body,
      article_date: req.body.article_date,
      article_owner: {}
    }
    article.article_owner = req.user.user

    axios.post(config.DB_URL + "blog-articles", article).then(data => {
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

router.patch('/article/:article_title', async (req, res, next) => {
  try {
    let article = {
      article_title: req.body.article_title,
      article_body: req.body.article_body,
      article_date: req.body.article_date,
      article_owner: {}
    }
    article.article_owner = req.user.user
    axios.get(config.DB_URL + 'blog-articles?q={"article_title":"' + req.params.article_title + '"}').then(datas => {
      axios.patch(config.DB_URL + 'blog-articles/' + datas.data[0]._id, article).then(data => {
        return res.json({
          message : 'Article Successfully updated',
          article: data.data
        })
      }).catch(err => {
        return res.json({
          message : 'Article updating failed',
          error: err
        })
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

router.delete('/article/:article_title', async (req, res, next) => {
  try {
    axios.delete(config.DB_URL + 'blog-articles/*?q={"article_title":"' + req.params.article_title + '"}').then(data => {
      return res.json({
        message : 'Article Successfully deleted',
        deleted: data.data.result
      })
    }).catch(err => {
      return res.json({
        message : 'Article deletion failed',
        error: err
      })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
