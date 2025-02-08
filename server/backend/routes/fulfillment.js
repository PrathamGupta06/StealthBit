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
});

const upload = multer({ storage: storage });

/**
 * Handle all types of fulfillment
 * @route POST /api/fulfill/:requestId
 */
router.post('/:requestId', upload.single('img'), async (req, res, next) => {
    try {
        const { requestId } = req.params;
        
        // Fetch the request from the database
        const request = await Request.findById(requestId);
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        // Check if the request has already been fulfilled
        if (request.fulfilled) {
            return res.status(400).json({ message: 'Request has already been fulfilled' });
        }
        
        // Process the request based on its demand
        if (request.demand === 'camera' || request.demand === 'screenshot') {
            if (!req.file) {
                return res.status(400).json({ message: 'No image file uploaded' });
            }
            
            // Update the request
            request.fulfilled = true;
            request.fulfilledAt = req.file.destination + '/' + req.file.filename;
        } else {
            return res.status(400).json({ message: 'Invalid demand type' });
        }
        
        // Save the updated request
        const updatedRequest = await request.save();
        
        res.json(updatedRequest);
    } catch (err) {
        next(err);
    }
});

export default router;

