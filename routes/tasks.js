const router = require('express').Router();
const tasksController = require('../controllers/tasks');
const validation = require('../middleware/validate')

// GET Requests (Read)
router.get('/', validation.authCheck, validation.handleErrors(tasksController.getAllTasks));
router.get('/:id', validation.authCheck, validation.handleErrors(tasksController.getSingleTask));

// POST Requests (Create)
router.post('/', validation.authCheck, validation.taskDataValidation(), validation.checkTaskData, validation.handleErrors(tasksController.createTask));

// PUT Requests (Update)
router.put('/:id', validation.authCheck, validation.taskDataValidation(), validation.checkTaskData, validation.handleErrors(tasksController.updateTask));

// DELETE Requests (Delete)
router.delete('/:id', validation.authCheck, validation.handleErrors(tasksController.deleteTask));


module.exports = router;