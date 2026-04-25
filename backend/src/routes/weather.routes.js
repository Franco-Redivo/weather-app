import { Router } from 'express';
import {
    createWeatherEntry,
    getWeatherEntries,
    getWeatherEntryById,
    updateWeatherEntry,
    deleteWeatherEntry
} from '../controllers/weather.controllerjs';
import { exportWeatherData } from '../controllers/export.controller';

const router = Router();

router.post('/', createWeatherEntry);
router.get('/', getWeatherEntries);
router.get('/:id', getWeatherEntryById);
router.put('/:id', updateWeatherEntry);
router.delete('/:id', deleteWeatherEntry);
router.get('/export', exportWeatherData);

export default router;