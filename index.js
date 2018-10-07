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

var client_id = 'e81545ea2fac4b499b295ec9f10dc8df'; // Your client id
var client_secret = 'd04145cf0883444c8a11e6b0cbbcb791'; // Your secret

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.send("Hello World!")
});

app.get('/client_credentials', function(req, res) {

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    } else {
      console.log("Deu erro")
      console.log(error)
      console.log(response)
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
