const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
MongoClient.connect('mongodb://localhost:27017', (err, db) => {
    if (err) {
        return console.error('Unable to connect to MongoDB server, Error is: ', err);
    }

    console.log('Connected to MongoDB server');
});
//נוסיף מידלוור 
app.use(bodyParser.urlencoded({ extended: true }));

//הגדרות
app.get('/', (req,res) => {
    res.sendFile(__dirname + '\\index.html');
});
app.post('/quotes', (req,res) => {
    console.log(req.body);
});

//הפעלה
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});