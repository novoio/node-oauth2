const passport = require('passport');
const secrets = require('./secrets');

// ----------------------------------------------------------------------------
// LinkedIn OAuth2
// ----------------------------------------------------------------------------
passport.serializeUser((user, done) => {
  console.log(">>> >>> Serializing a user");
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(">>> >>> De-serializing a user");
  console.log(user);
  done(null, user);
});

///////////            Linkedin OAuth               ///////////

const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(
  new LinkedinStrategy(
    {
      clientID: secrets.getSecret('linkedinClientId'),
      clientSecret: secrets.getSecret('linkedinClientSecret'),
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ["r_emailaddress", "r_basicprofile"],
      state: true,
      proxy: true
    },
    (acessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        createUserController(profile, done);
      });
    }
  )
);

// ----------------------------------------------------------------------------
// Meetup OAuth2
// ----------------------------------------------------------------------------
// const MeetupStrategy = require("passport-meetup-oauth2").Strategy;
const MeetupStrategy = require("passport-oauth2-meetup").Strategy;

passport.use(
  new MeetupStrategy(
    {
      clientID: secrets.getSecret('meetupClientId'),
      clientSecret: secrets.getSecret('meetupClientSecret'),
      callbackURL: 'http://localhost:3000/auth/meetup/callback',
      state: true
    },
    (acessToken, refreshToken, profile, done) => {
      // console.log(profile);
      // let user = "abc";
      let user = profile;
      return done(null, user);
    }
  )
);


module.exports = app => {
  app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin"),
    (req, res) => {}
  );

  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
      successRedirect: "/mesh",
      failureRedirect: "/auth/linkedin"
    })
  );

  app.get('/auth/meetup', passport.authenticate("meetup"));

  app.get(
    "/auth/meetup/callback",
    passport.authenticate("meetup", { failureRedirect: "/auth/meetup" }),
    function(req, res) {
      // Successul authentication, redirect home.
      res.redirect("/api");
    }
  );
};
