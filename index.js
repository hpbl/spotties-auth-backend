/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var client_id = 'e81545ea2fac4b499b295ec9f10dc8df'; // Your client id
var client_secret = 'd04145cf0883444c8a11e6b0cbbcb791'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => authenticateSpotify())
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function authenticateSpotify() {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/search',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true,
        qs: {
          q: 'tania%20bowra',
          type: 'artist'
        }
      };

      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });
};
