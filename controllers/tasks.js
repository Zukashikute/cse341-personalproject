const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET Request Controllers (Read)

const getAllTasks = async (req, res, next) => {
   // #swagger.description = 'Getting all tasks from our database'
   try {
      mongodb
         .getDb()
         .db()
         .collection('tasks')
         .find()
         .toArray((err, lists) => {
            if (err) {
               res.status(400).json({ message: err })
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
         });

   } catch {
      console.log("Error on getting all tasks", err)
   }

};

const getSingleTask = async (req, res, next) => {
   // #swagger.description = 'Getting a single task from our database using id'
   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid task id to find a task');
   }
   const userId = new ObjectId(req.params.id)
   mongodb
      .getDb()
      .db()
      .collection('tasks')
      .find({ _id: userId }).toArray((err, result) => {
         if (err) {
            res.status(400).json({ message: err })
         }
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(result[0]);
      });
};

// POST Request Controllers (Create)
const createTask = async (req, res) => {
   // #swagger.description = 'Creating a single task to our database'

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

   const response = await mongodb
      .getDb()
      .db()
      .collection('tasks')
      .insertOne(task);

   if (response.acknowledged) {
      return res.status(201).json(response);
   } else {
      return res.status(500).json(response.error || 'Error occurred while creating a task.');
   }

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

   const response = await mongodb
      .getDb()
      .db()
      .collection('tasks')
      .replaceOne({ _id: userId }, task)

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

   const userId = new ObjectId(req.params.id);

   const response = await mongodb
      .getDb()
      .db()
      .collection('tasks')
      .deleteOne({ _id: userId }, true)

   if (response.deletedCount > 0) {
      return res.status(200).send();
   } else {
      return res.status(500).json(response.error || 'Some error occurred while deleting the task.');
   }

}


module.exports = { getAllTasks, getSingleTask, createTask, updateTask, deleteTask };