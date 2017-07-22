var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('./app/models/users');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/UsersDB');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

router.use((req, res, next) => {
    console.log('Working!');
    next();
});

router.route('/users')
    .post((req, res) => {

        var users = new Users();
        users.name = req.body.name;
        users.age = req.body.age;
        users.username = req.body.username;
        users.password = req.body.password;

        users.save((err) => {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    })
    .get((req, res) => {
        Users.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

router.get('/', (req, res) => {
    res.json({ message: 'Api ready!' });
});

app.use('/api', router);

app.listen(port);
console.log('The app is running on port: ' + port);
console.log('Active end points: http://localhost:8080/api/users');