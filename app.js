const express = require('express');
require('dotenv').config('.env');

const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL

const client = new MongoClient(url);
// client.connect()
const db = client.db("data")
const col = db.collection("objects")
// col.insertOne({"test":"True"})


const app = express();
const PORT = 3000;

app.use(express.json())


app.get('/', (req,res) => {
    res.status(200);
    res.send("Testing");
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
