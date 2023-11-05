const { ObjectId } = require('mongodb');
const db = require('../models');
const Tasks = db.tasks;

// GET Request Controllers (Read)

const getAllTasks = async (req, res, next) => {
   // #swagger.description = 'Getting all tasks from our database'
   Tasks.find({}).then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
   })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'An error occurred while getting tasks.',
         });
      });

};

const getSingleTask = async (req, res, next) => {
   // #swagger.description = 'Getting a single task from our database using id'

   const userId = req.params.id
   Tasks.findOne({ _id: userId }).then((data) => {
      if (!data) {
         res.status(400).send({ message: 'No task found with id ' + userId });
      } else {
         res.status(200).json(data);
      }
   })
      .catch((err) => {
         res.status(500).send({
            message: 'Error getting task with id ' + userId,
         });
      });
};

// POST Request Controllers (Create)
const createTask = async (req, res) => {
   // #swagger.description = 'Creating a single task to our database'

   const task = new Tasks({
      title: req.body.title,
      description: req.body.description,
      questPoints: req.body.questPoints,
      assignee: req.body.assignee,
      reporter: req.body.reporter,
      priority: req.body.priority,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
   });

   await task.save().then((data) => {
      console.log(data);
      res.status(201).send(data);
   })
      .catch((err) => {
         res.status(500).send({
            message: err.message || 'Error occurred while creating a task.'
         });
      });

}

// PUT Request Controllers (Update)
const updateTask = async (req, res) => {
   // #swagger.description = 'Updating a single task to our database'
   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to update a task');
   }

   const userId = new ObjectId(req.params.id)
   const task = {
      title: req.body.title,
      description: req.body.description,
      questPoints: req.body.questPoints,
      assignee: req.body.assignee,
      reporter: req.body.reporter,
      priority: req.body.priority,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
   };

   const response = await Tasks.findByIdAndUpdate(userId, task, { new: true })

   if (response.modifiedCount > 0) {
      return res.status(204).send();
   } else {
      return res.status(500).json(response.error || 'Some error occurred while updating the task.');
   }

}


const deleteTask = async (req, res) => {
   // #swagger.description = 'Deleting a single task to our database'
   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to delete a task');
   }

   const userId = req.params.id;

   Tasks.deleteOne({ _id: userId })
      .then((data) => {
         if (data.deletedCount > 0) {
            res.status(200).send();
            console.log(data)
         } else {
            res.status(500).json(response.error || 'Some error ocurred while deleting the employee data')
         }
      })

}


module.exports = { getAllTasks, getSingleTask, createTask, updateTask, deleteTask };