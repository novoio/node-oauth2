const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');

const app = express();
const router = express.Router();

app.use(express.static('static'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// required for passport
app.use(session({ secret: 'NewWorld_MeetUp_Integration' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const auth = require('./auth')(app);

app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'The authentication has been done successfully!' });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(3000, function () {
  console.log('App started on port 3000');
});