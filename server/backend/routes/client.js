import { Router } from "express";
import Request from '../models/requestModel.js';
import path from 'path';

const router = Router();

/**
 * Create a new request
 * @route POST /api/client/createRequest
 */
router.post('/createRequest', async (req, res, next) => {
    try {
        console.log(req.body);
        const request = new Request({
            victimId: req.body.victimId,
            demand: req.body.demand,
        });
        //TODO check VictimId from Victims database before creating a request

        const savedRequest = await request.save();
        res.json(savedRequest);
    } catch (err) {
        next(err);
    }
});

/**
 * Get all requests for a specific victim
 * @route GET /api/client/requests/:victimId
 */
router.get('/requests/:victimId', async (req, res, next) => {
    try {
        const requests = await Request.find({ victimId: req.params.victimId });
        res.json(requests);
    } catch (err) {
        next(err);
    }
});

/**
 * Get a specific request's data (fulfilled)
 * @route GET /api/client/request/:requestId
 */
router.get('/request/:requestId', async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.requestId);
        res.sendFile(path.join(path.resolve(), request.fulfilledAt));
    } catch (err) {
        next(err);
    }
});

export default router;

