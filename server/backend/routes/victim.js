import { Router } from "express";
import Victim from '../models/victimModel.js';

const router = Router();

/**
 * Get all victims
 * @route GET /api/victim
 */
router.get('/', async (req, res, next) => {
    try {
        const victims = await Victim.find();
        res.json(victims);
    } catch (err) {
        next(err);
    }
});

/**
 * Get a specific victim by ID
 * @route GET /api/victim/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const victim = await Victim.findOne({ _id: req.params.id });
        if (!victim) {
            return res.status(404).json({ message: 'Victim not found' });
        }
        res.json(victim);
    } catch (err) {
        next(err);
    }
});

/**
 * Update a victim
 * @route POST /api/victim/:id
 */
router.post('/:id', async (req, res, next) => {
    try {
        const updatedVictim = await Victim.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedVictim) {
            return res.status(404).json({ message: 'Victim not found' });
        }
        res.json(updatedVictim);
    } catch (err) {
        next(err);
    }
});

export default router;

