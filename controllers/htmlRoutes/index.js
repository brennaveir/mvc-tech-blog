const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  })

});
router.get('/login', async (req, res) => {
  res.render('login')
});

router.get('/blogpost', async (req, res) => {
  res.render('blogpost')
});


module.exports = router;