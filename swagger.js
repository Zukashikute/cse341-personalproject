const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'Personal Project (CSE 341)',
      description: 'CSE 341 API',
   },
   host: 'cse341-personalproject.onrender.com',
   schemes: ['https'],
   tags: ['Tasks'],
   definitions: {
      id: '652b4f5627258534c311fd4c',
      TaskInput: {
         title: "[BE] Get Request",
         description: "Create get request to fetch for all tasks",
         questPoints: 3,
         assignee: "iRed",
         reporter: "Jared Bala",
         priority: "Highest",
         startDate: "2023-10-09T16:00:00.000+00:00",
         dueDate: "2023-10-14T16:00:00.000+00:00"

      }
   },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);