const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET Request Controllers (Read)

const getAllTasks = async (req, res, next) => {
   // #swagger.description = 'Getting all tasks from our database'
   try {
      const result = await mongodb.getDb().db().collection('tasks').find().toArray();
      console.log(result);
      result.then((lists) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(lists);
      });
   } catch {
      console.log("Error on getting all tasks", err)
   }

};

const getSingleTask = async (req, res, next) => {
   // #swagger.description = 'Getting a single task from our database using id'
   const userId = new ObjectId(req.params.id)
   try {
      const result = await mongodb
         .getDb()
         .db()
         .collection('tasks')
         .find({ _id: userId }).toArray();
      result.then((lists) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(lists[0]);
      });
   }
   catch (err) {
      console.log("Error on getting a single task", err)
   }
};

// POST Request Controllers (Create)
const createTask = async (req, res) => {
   // #swagger.description = 'Creating a single task to our database'
   try {
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
   } catch (err) {
      res.status(500).json(err);
   }

}


module.exports = { getAllTasks, getSingleTask, createTask };