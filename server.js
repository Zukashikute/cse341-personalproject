// Express Web Server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const passportSetup = require('./config/passportSetup');

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
   .use(cors())
   .use('/', require('./routes'));

db.mongoose
   .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      app.listen(port, () => {
         console.log(`DB Connected and server running on ${port}.`);
      });
   })
   .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
   });