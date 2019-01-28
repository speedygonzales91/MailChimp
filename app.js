//jshint esversion:6

const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/',function(req, res){
  console.log(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//API key
//fa460c34843d94c5d54f073b6e07af1c-us20

//List id:
//3f429296b9
