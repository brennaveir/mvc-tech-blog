const router = require('express').Router();
const { Blogpost, User } = require('../models');
// const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//   res.render('homepage', {
//     loggedIn: req.session.loggedIn,
//   })

// });
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['username'],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login')
});

router.get('/blogpost', async (req, res) => {
  res.render('blogpost')
});


module.exports = router;