const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const router = Router();
const Post = require('../models/posts');

module.exports = router
  .get('/', authenticate, async (req, res, next) => {
    try {
      const response = await Post.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
