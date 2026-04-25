import { Router } from 'express';
import {
    createWeatherEntry,
    getWeatherEntries,
    getWeatherEntryById,
    updateWeatherEntry,
    deleteWeatherEntry
} from '../controllers/weather.controller.js';
import { exportWeatherData } from '../controllers/export.controller.js';

const router = Router();

router.post('/', createWeatherEntry);
router.get('/', getWeatherEntries);
router.get('/export', exportWeatherData);
router.get('/:id', getWeatherEntryById);
router.put('/:id', updateWeatherEntry);
router.delete('/:id', deleteWeatherEntry);

export default router;