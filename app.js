var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configure the app 
app.set("view engine", "ejs");
// using body-parser to extract email from user's GET request
app.use(bodyParser.urlencoded({extended: true}));
// connect stylesheet 
app.use(express.static(__dirname + "/public"));


// establish a connection with the database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'electromagnetron',
    database : 'join_us'
});


// Routes below
app.get("/", function(request, response) {
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(error, results){
        if (error) throw error;
        var users = (results[0].count);
        response.render("home", {users: users});
    });
});

app.post('/register', function(request, response) {
  // Extract email from get request
  var NewUser = {email: request.body.email};
  // add new user to database
  connection.query("INSERT INTO users SET ?", NewUser, function(error, result){
      if (error) throw error;
      response.redirect("/");
      console.log(result);
  });
});


// start server
app.listen(8080, function() {
    console.log("server running on port: 8080!");
});