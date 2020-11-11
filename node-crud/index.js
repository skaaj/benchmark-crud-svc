const express = require('express');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

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

function startServer(app, args) {
    const port = 9002;
    
    // const mongoClient = args['client'];
    // const mongoColl = args['database'].collection('users');
    
    app.get('/ping', (req, res) => {
        res.send('');
    });

    // app.get('/users', (req, res) => {
    //     mongoColl.find({}).toArray((err, docs) => {
    //         res.send(docs);
    //     });
    // });
    
    app.listen(port, () => {
        console.log(`Server node listening on port ${port}.`);
    });

    // process.on('SIGTERM', () => {
    //     mongoClient.close();
    //     server.close();
    // });
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const app = express();
    app.get('/ping', (req, res) => {
        res.send('');
    });
    app.listen(9002);
    console.log(`Worker ${process.pid} started`);
}
