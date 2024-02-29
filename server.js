const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

// initialize express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// initialize db connection
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, DELETE, OPTIONS'
            );
            next();
});
        
app.listen(5000); // start Node + Express server on port 5000


app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    var error = '';

    const { login, password } = req.body;

    const db = client.db();
    const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';

    if (results.length > 0)
    {
        id = results[0].userID;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }

    var ret = { id:id, firstName:fn, lastName:ln, error:error};
    res.status(200).json(ret);
});