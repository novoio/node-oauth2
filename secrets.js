// secrets.js

const dotenv = require('dotenv');

// loads the values from .env file into application's process.env
dotenv.config();

const secrets = {
  meetupClientId: process.env.MEETUP_CLIENT_ID,
  meetupClientSecret: process.env.MEETUP_CLIENT_SECRET,

  linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET
};

module.exports.getSecret = function(key) { 
  return secrets[key];
}