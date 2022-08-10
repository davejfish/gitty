const { Router } = require('express');
const GithubUser = require('../models/ghUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');
const router = Router();


module.exports = router
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await exchangeCodeForToken(code);
      
      const ghProfile = await getGithubProfile(token);

      let user = await GithubUser.findByUserName(ghProfile.login);
      if (!user) {
        user = await GithubUser.insert({
          username: ghProfile.login,
          email: ghProfile.email,
          avatar: ghProfile.avatar_url,
        });
      }

      res.json(user);
      
    } catch (e) {
      next(e);
    }
  });
