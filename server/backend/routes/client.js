import { Router } from "express";
import Request from '../models/requestModel.js';

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
 * Health check for client route
 * @route GET /api/client/health
 */
router.get('/health', (req, res) => {
    res.send('Client route OK');
});

export default router;

