//jshint esversion:6

const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.eMail;

  var data = {
    members : [
      {
        email_address: email,
        status : "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/3f429296b9',
    method: 'POST',
    headers : {
      "Authorization": "zsolt1 fa460c34843d94c5d54f073b6e07af1c-us20"
    },
    body: jsonData
  };
  request(options, function(error, response, body) {
    if(error) {
      console.log(errror);
      //res.send('There was an error with sign up, please try again!');
      res.sendFile(__dirname + '/failure.html');
    } else {
      if (response.statusCode === 200) {
        console.log(response.statusCode);
        res.sendFile(__dirname + '/success.html');
        //res.send('Hurray!, Successfully signed up!');
      } else {
        res.sendFile(__dirname + '/failure.html');
        //res.send('There was an error with sign up, please try again!');
      }

    }
  });


});

app.post('/failure', function(req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));

//API key
//fa460c34843d94c5d54f073b6e07af1c-us20

//List id:
//3f429296b9
