import { Router } from "express";
import Victim from '../models/victimModel.js';
import Request from '../models/requestModel.js';
const router = Router();

router.post('/createRequest', (req, res) => {

    //TODO filter demand for invalid strings

    const request = new Request({
        id: new mongoose.Types.ObjectId(),
        victimId: req.body.victimId,
        demand: req.body.demand,
    });

    request.save().then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

router.get('/requests/:victimId', (req, res) => {
    const victimId = req.params.victimId;
    Request.find({victimId: victimId}).then((docs) => {
        res.json(docs);
    }).catch((err) => {
        res.status(400).json(err);
    });
} )

router.route('/health')
    .get((req, res) => {
        res.send('OK');
});

export default router