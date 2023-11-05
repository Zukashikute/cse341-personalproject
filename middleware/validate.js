const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const taskDataValidation = () => {
   return [
      body("title")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please provide a title."),

      body("description")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please provide a description."),

      body("questPoints")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please provide a number for how many questpoints."),

      body("assignee")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please provide the name of the assignee."),

      body("reporter")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please provide the name of the reporter."),

      body("priority")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please, provide a job position."),

      body("startDate")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please, provide a start date."),

      body("dueDate")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please, provide an end date."),
   ]
}


const checkTaskData = async (req, res, next) => {
   const { title, description, questPoints, assignee, reporter, priority, startDate, endDate } = req.body
   let errors = []
   errors = validationResult(req)
   if (!errors.isEmpty()) {
      res.json(errors)
      return
   }
   next()
}

const registrationRules = () => {
   return [
      body("username")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please, provide a username."),

      body("email")
         .trim()
         .isEmail()
         .normalizeEmail()
         .withMessage("A valid email is required."),

      body("password")
         .trim()
         .isLength({ min: 6 })
         .withMessage("The minimum password length is 6 characters"),
   ]
}

const checkRegisterData = async (req, res, next) => {
   const { username, email } = req.body
   let errors = []
   errors = validationResult(req)
   if (!errors.isEmpty()) {
      res.json(errors)
      return
   }
   next()
}


const updateRules = () => {
   return [
      body("username")
         .trim()
         .isLength({ min: 1 })
         .withMessage("Please, provide a username."),

      body("email")
         .trim()
         .isEmail()
         .normalizeEmail()
         .withMessage("A valid email is required."),
   ]
}

const checkUpdateData = async (req, res, next) => {
   const { username, email } = req.body
   let errors = []
   errors = validationResult(req)
   if (!errors.isEmpty()) {
      res.json(errors)
      return
   }
   next()
}


const authCheck = async (req, res, next) => {
   if (req.user) {
      next();
   } else if (req.cookies.jwt) {
      jwt.verify(
         req.cookies.jwt,
         process.env.ACCESS_TOKEN_SECRET,
         function (err, user) {
            if (err) {
               console.log(err)
            }
            next()
         })
   } else {
      return res.send('Sorry, you must first log in before using the system!')
   }
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
const handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)












module.exports = { taskDataValidation, checkTaskData, registrationRules, checkRegisterData, updateRules, checkUpdateData, authCheck, handleErrors };