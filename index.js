var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var router = express.Router();
var url =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/UsersDB';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.send('Connection failed');
        } else {
            findUsers(db, function (result) {
                res.send(result);
                db.close();
            });
        }
    });

});

var findUsers = function (db, callback) {
    var collection = db.collection('Users');
    collection.find({}).toArray(function (err, docs) {
        callback(docs);
    });
}
app.listen(port);