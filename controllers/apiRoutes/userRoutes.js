const router = require('express').Router();
const { User } = require('../../models');


router.post('/signup', async (req, res) => {
    try {
       
 const dbUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        const plainUser = dbUser.get( { plain: true })
        console.log(plainUser)

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(201).json(plainUser)
        });
    } catch (error) {
        console.log(error)
    }

});

router.post('/login', async (req, res) => {
    try {
      const dbUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!dbUser) {
        return res
          .status(404)
          .json({ message: "Get outta here. I don't know you" });
      }
  
      const isValidPassword = await dbUser.comparePassword(req.body.password);
  
      if (!isValidPassword) {
        return res.status(404).json({ message: 'Wrong password' });
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        return res
          .status(200)
          .json({ message: "You're the best. I'm so proud of you!" });
      });
    } catch (error) {
      return res.status(500).json({ message: 'You screwed it up' });
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;