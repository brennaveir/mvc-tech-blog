const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

//only visible when logged in
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogpost = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogpost, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    res.render('blogpost', {
      ...blogpost,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Blogpost }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('dashboard', {
//       ...user,
//       loggedIn: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Only visible when logged in
router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.loggedIn
  })
});

router.get('/login', async (req, res) => {
  res.render('login')
});




module.exports = router;