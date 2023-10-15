const router = require('express').Router();
const tasksController = require('../controllers/tasks');

// GET Requests (Read)
router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getSingleTask);

// POST Requests (Create)
router.post('/', tasksController.createTask);


module.exports = router;