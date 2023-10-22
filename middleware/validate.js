const validator = require('../helpers/validate');

const saveTask = (req, res, next) => {
   const validationRule = {
      title: 'required|string',
      description: 'string',
      questPoints: 'digits_between:0,4',
      assignee: 'string',
      reporter: 'string',
      priority: 'string',
      startDate: 'date',
      dueDate: 'date',
   };
   validator(req.body, validationRule, {
      "required.title": 'We cannot create a task without a title.',
      "description": 'Task description',
      "questPoints": 'Quest points must be a number between 0 and 4',
      "assignee": 'Name of the assignee',
      "reporter": 'Name of the reporter',
      "priority": 'Low, Medium, High, Highest',
      "startDate": 'Date must be in this format = (2015-03-25 or 03/25/2015 or Mar 25 2015 / 25 Mar 2015)',
      "dueDate": 'Date must be in this format = (2015-03-25 or 03/25/2015 or Mar 25 2015 / 25 Mar 2015)',
   }, (err, status) => {
      if (!status) {
         res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
         });
      } else {
         next();
      }
   });
};

module.exports = {
   saveTask
};