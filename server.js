var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('./app/models/users');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/UsersDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

router.use(function (req, res, next) {
    console.log('Working!');
    next();
});

router.route('/users')
    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(function (req, res) {

        var users = new Users();
        users.name = req.body.name;
        users.age = req.body.age;
        users.username = req.body.username;
        users.password = req.body.password;

        // save the user and check for errors
        users.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    });

router.get('/', function (req, res) {
    res.json({ message: 'woof! welcome to my api!' });
});

app.use('/api', router);

app.listen(port);
console.log('The app is running on port: ' + port);