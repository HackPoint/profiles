const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const username = "hackp0int";
const password = "123456";
const connStr = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@ds119675.mlab.com:19675/profiles`;

const ObjectID = mongodb.ObjectID;
const CONTACTS_COLLECTION = "profiles";

const app = express();
app.use(bodyParser.json());

var db;

const handleError = (res, reason, message, code) => {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};
console.log(connStr)
MongoClient.connect(connStr, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log("Database connection ready");

    const server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// Routes
app.get("/api/profiles", function (req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/profiles", function(req, res) {
    let newContact = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
