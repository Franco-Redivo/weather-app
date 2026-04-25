import {
    getCurrentWeather,
    getWeatherForecast,
    getHistoricalWeather
} from '../services/weather.service.js';
import { isInTimeInterval, locationToCoordinates } from '../utils/weather.utils.js';
import weatherMutations from '../models/weatherMutations.js';
import weatherQueries from '../models/weatherQueries.js';
import { getYoutubeVideos } from '../services/youtube.service.js';

export const createWeatherEntry = async (req, res) => {
    try {
        const { location, startDate, endDate } = req.body;

        if (!location) {
            return res.status(400).json({ error: 'Location is required' });
        }

        if(startDate && !endDate || !startDate && endDate) {
            return res.status(400).json({ error: 'Both startDate and endDate must be provided together' });
        }

        const { latitude, longitude } = await locationToCoordinates(location);

        const videos = await getYoutubeVideos(location);

        if (startDate && endDate) {
            if (!isInTimeInterval(startDate, endDate)) {
                return res.status(400).json({ error: 'Dates must be between 16 days before today and 16 days after today' });
            }
            const historicalWeather = await getHistoricalWeather(latitude, longitude, startDate, endDate);
            const weatherEntry = await weatherMutations.createWeatherEntry(location, latitude, longitude, startDate, endDate, historicalWeather, videos);
            return res.json(weatherEntry);
        }

        const weatherForecast = await getWeatherForecast(latitude, longitude);
        const currentDateTime = new Date().toISOString();
        const weatherEntry = await weatherMutations.createWeatherEntry(location, latitude, longitude, currentDateTime, currentDateTime, weatherForecast, videos);
        res.json(weatherEntry);
    } catch (error) {
        console.error('Error creating weather entry:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

export const getWeatherEntries = async (req, res) => {
    try {
        const weatherEntries = await weatherQueries.getAllWeatherEntries();
        res.json(weatherEntries);
    } catch (error) {
        console.error('Error fetching weather entries:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

export const getWeatherEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const parsedId = Number.parseInt(id, 10);

        if (Number.isNaN(parsedId)) {
            return res.status(400).json({ error: 'Invalid weather entry id' });
        }

        const weatherEntry = await weatherQueries.getWeatherEntryById(id);
        if (!weatherEntry) {
            return res.status(404).json({ error: 'Weather entry not found' });
        }
        res.json(weatherEntry);
    } catch (error) {
        console.error('Error fetching weather entry:', error);
        res.status(500).json({ error: error.message ||'Internal server error' });
    }
}

export const updateWeatherEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, startDate, endDate } = req.body;

        if (!location) {
            return res.status(400).json({ error: 'Location is required' });
        }

        const { latitude, longitude } = await locationToCoordinates(location);
        
        if (startDate && endDate) { 
            if (!isInTimeInterval(startDate, endDate)) {
                return res.status(400).json({ error: 'Dates must be between 16 days before today and 16 days after today' });
            }
            const historicalWeather = await getHistoricalWeather(latitude, longitude, startDate, endDate);
            const videos = await getYoutubeVideos(location);
            const weatherEntry = await weatherMutations.updateWeatherEntry(id, location, latitude, longitude, startDate, endDate, historicalWeather, videos);
            return res.json(weatherEntry);
        }

        const weatherForecast = await getWeatherForecast(latitude, longitude);
        const weatherEntry = await weatherMutations.updateWeatherEntry(id, location, latitude, longitude, startDate, endDate, weatherForecast);
        res.json(weatherEntry);
    } catch (error) {
        console.error('Error updating weather entry:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

export const deleteWeatherEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const weatherEntry = await weatherMutations.deleteWeatherEntry(id);
        if (!weatherEntry) {
            return res.status(404).json({ error: 'Weather entry not found' });
        }
        res.json({ message: 'Weather entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting weather entry:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
