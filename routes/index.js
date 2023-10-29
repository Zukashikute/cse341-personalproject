const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/', require('./home'));
router.use('/tasks', require('./tasks'));
router.use('/auth', require('./user'));

module.exports = router;