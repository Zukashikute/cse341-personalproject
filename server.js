// Express Web Server
const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const cors = require('cors')

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
   .use(cors())
   .use('/', require('./routes'));


mongodb.initDb((err, mongodb) => {
   if (err) {
      console.log(err);
   } else {
      app.listen(port, () => {
         console.log('Connected to DB and listening on ' + port);
      });
   }
});