import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

// // Based on: https://stackoverflow.com/a/62892482/1598814
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

async function connectToDb() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        let db = await client.db('quotes');

        return db;
    } catch (error) {
        process.exit(1);
    }
}

async function main() {
    const myMongoDb = await connectToDb();
    console.log('Connect to mongodb - successed ');

    const myCollection = myMongoDb.collection('idioms')


    // נוסיף מידלוור
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    /// הגדרות
    app.get('/', async (req, res) => {

        const idioms = await myCollection.find().toArray();
        //resconsole.log('idioms', idioms);
        //res.sendFile(__dirname + '\\index.html');
        res.render('index', { quotes: idioms });

    });

    app.post('/quotes', async (req, res) => {
        console.log(req.body);
        await myCollection.insertOne(req.body);
        res.redirect('/');
    });
    app.put('/quotes', async (req, res) => {
        console.log('PUT', req.body);
        await myCollection.findOneAndUpdate(
            { name: 'הרצל' },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            { upsert: true }
        )
        res.status(200).send('Ok');
    });
    
    app.delete('/quotes', async (req, res) => {
        console.log('DELETE', req.body)
        await myCollection.deleteOne({ name: req.body.name });
        res.json('succes');
    });

    // הפעלה
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });

}


main();

