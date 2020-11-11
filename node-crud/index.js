const express = require('express');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

function startMongo() {
    const url = 'mongodb://localhost:27017';
    const databaseName = 'main'
    const client = new MongoClient(url, {
        useUnifiedTopology: true
    });
    
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if(err !== null)
                reject(err);
            else
                resolve({
                    'client': client,
                    'database': client.db(databaseName)
                })
        });
    });
}

function startServer(args) {
    const app = express();
    const port = 9002;
    
    const mongoClient = args['client'];
    const mongoColl = args['database'].collection('users');
    
    app.get('/ping', (req, res) => {
        res.send('');
    });

    app.get('/users', (req, res) => {
        mongoColl.find({}).toArray((err, docs) => {
            res.send(docs);
        });
    });
    
    const server = app.listen(port, () => {
        console.log(`Server node listening on port ${port}.`);
    });

    process.on('SIGTERM', () => {
        mongoClient.close();
        server.close();
    });
}

startMongo()
    .then(startServer)
