// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(
            rows
        )
      });
});

app.get("/api/user/:sensor", (req, res, next) => {
    var sql = "select * from user where sensor = ?"
    var params = [req.params.sensor]
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(
            row
        )
      });
});

app.post("/api/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.sensor){
        errors.push("No Temperature specified");
    }
    if (!req.body.value){
        errors.push("No Pressure specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        sensor: req.body.sensor,
        value: req.body.value
    }
    var sql ='INSERT INTO user (sensor, value) VALUES (?,?)'
    var params =[data.sensor, data.value]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json(
            data
        )
    });
})
// Default response for any other request
app.use(function(req, res){
    res.status(404);
});