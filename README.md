# NodeJS - oAuth 2.0
This is a simple NodeJS backend demonstrating the authentication of [Meetup](https://www.meetup.com/) and [LinkedIn](https://linkedin.com/) via **oAuth 2.0**.

### Main `npm` libraries
* `passport`
* `passport-linkedin-oauth2`
* `passport-oauth2-meetup`
* `dotenv`
* `express`
* `express-session`

## Installation
1. Download or clone this repo.
2. Create a Meetup oAuth consumer [here](https://secure.meetup.com/meetup_api/oauth_consumers/).
3. Create a LinkedIn application [here](https://www.linkedin.com/developer/apps) for leveraging its APIs.
4. Rename `.env.sample` to `.env` and paste your ClientID and ClientSecret keys created in the above steps.
5. Run `$ npm install` under the project root directory.
6. Start server: `$ npm start`
7. LinkedIn authentication: `http://localhost:3000/auth/linkedin`
8. Meetup authentication: `http://localhost:3000/auth/meetup`

##  
After it's authencticated successfully, it will be redirected to `http://localhost:3000/api` with the following JSON response:
```json
{
  message: "The authentication has been done successfully!"
}
```