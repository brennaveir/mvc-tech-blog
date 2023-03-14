const router = require('express').Router();
const { Blogpost, User } = require('../models');


router.get('/', async (req, res) => {
    try {
      const myBlogpostData = await Blogpost.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: ['id','username'],
          },
        ],
      });
      const myBlogposts = myBlogpostData.map((blogposts) => blogposts.get({ plain: true }));
      console.log(myBlogposts);
      const { loggedIn } = req.session;
      if (loggedIn) {
        res.render('dashboard', {
          myBlogposts,
          loggedIn: req.session.loggedIn,
        });
        return;
      }
      res.render('login');
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/', (req, res) => {
    res.render('dashboard', { loggedIn: req.session.loggedIn });
  });
  
  module.exports = router;
  