const router = require('express').Router();

router.post('/login', async (req, res) => {
    const newUserData = req.body;

    req.session.save(() => {
        req.session.loggedIn = true;
     res.status(201).json({ message: "user created!" })
    })
   
    
})

module.exports = router;