// Express Web Server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const passportSetup = require('./config/passportSetup');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const port = process.env.PORT || 3000;

app.use(session({
   createTableIfMissing: true,
   db,
   secret: process.env.SESSION_SECRET,
   resave: true,
   saveUninitialized: true,
   name: 'sessionId',
   store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
   }),
}))

app.use(passport.initialize())
   .use(passport.session())
   .use(bodyParser.json())
   .use(cors())
   .use(cookieParser())
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