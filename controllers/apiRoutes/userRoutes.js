const router = require('express').Router();
const { User } = require('../../models');


router.post('/signup', async (req, res) => {
  try {

    const dbUser = await User.create(req.body);


    req.session.save(() => {
      req.session.user_id = dbUser.id;
      req.session.loggedIn = true;
      
      res.status(200).json(dbUser)
    });
  } catch (error) {
    console.log(error)
  }

});

router.post('/login', async (req, res) => {
  try {
    console.log('You made it!')
    const dbUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUser) {
      return res
        .status(404)
        .json({ message: "Wrong username or password!" });
    }

    const isValidPassword = await dbUser.comparePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(404).json({ message: 'Wrong username or password' });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      return res
        .status(200)
        .json({ message: "You're the best. I'm so proud of you!" });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Try again' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;