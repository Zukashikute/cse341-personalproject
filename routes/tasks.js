const router = require('express').Router();
const tasksController = require('../controllers/tasks');
const validation = (require('../middleware/validate'))

// GET Requests (Read)
router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getSingleTask);

// POST Requests (Create)
router.post('/', validation.saveTask, tasksController.createTask);

// PUT Requests (Update)
router.put('/:id', validation.saveTask, tasksController.updateTask);

// DELETE Requests (Delete)
router.delete('/:id', tasksController.deleteTask);


module.exports = router;