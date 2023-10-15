const router = require('express').Router();

router.use('/', require('./swagger.js'));
router.use('/', require('./home'));
router.use('/tasks', require('./tasks'));

module.exports = router;