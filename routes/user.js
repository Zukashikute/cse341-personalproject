const router = require('express').Router();
const passport = require('passport')
const validation = require('../middleware/validate');
const userController = require('../controllers/users');

// Login
router.post('/login', userController.userLogin);

//Create Account
router.post('/create', validation.registrationRules(), validation.checkRegisterData, userController.createAccount);

//logout 
router.get('/logout', validation.authCheck, userController.userLogout)

//update user account
router.put('/update/:id', validation.authCheck, validation.updateRules(), validation.checkUpdateData, userController.updateAccount)

//Oauth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('Success!')
    res.redirect('/')
})



module.exports = router;