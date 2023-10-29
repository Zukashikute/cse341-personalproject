const router = require('express').Router();
const passport = require('passport')

//Oauth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('Success!')
})



module.exports = router;