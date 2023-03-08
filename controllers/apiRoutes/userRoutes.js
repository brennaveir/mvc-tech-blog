const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
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

module.exports = router;