const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//only visible when logged in
router.get('/',  async (req, res) => {
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


router.get('/blogpost/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'user_id', 'date_created'],
          include: {
              model: User,
              attributes: ['id', 'username'],
          },
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    res.render('blogpost', {
      ...blogpost,
      loggedIn: req.session.loggedIn,
      current_user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        blogpost_id: req.body.blogpost_id,
      },
      include: [
        {
          model: User,
          attributes: ['id','username'],
        },
        {
          model: Blogpost,
          attributes: ['id']
        }
      ],
    });
    const blogpostComments = commentData.map((comments) => comments.get({ plain: true }));
    // console.log(blogpostComments);
    const { loggedIn } = req.session;
    if (loggedIn) {
      res.render('blogpost', {
        blogpostComments,
        loggedIn: req.session.loggedIn,
        current_user: req.session.user_id
      });
      return;
    }
    res.render('login');
  } catch (err) {
    console.log(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login')
});




module.exports = router;