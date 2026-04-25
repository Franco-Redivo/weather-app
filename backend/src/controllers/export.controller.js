import weatherQueries from "../models/weatherQueries";
import { Parser } from 'json2csv';

export const exportWeatherData = async (req, res ) => {
    try {
        const {format} = req.query;
        const weatherEntries = await weatherQueries.getAllWeatherEntries();

        if (!weatherEntries || weatherEntries.length === 0) {
            return res.status(404).json({ error: 'No weather entries found to export' });
        }

        const cleanedData  = weatherEntries.map(entry => ({
            id: entry.id,
            location: entry.location,
            latitude: entry.latitude,
            longitude: entry.longitude,
            startDate: entry.startDate ? new Date(entry.startDate).toISOString() : null,
            endDate: entry.endDate ? new Date(entry.endDate).toISOString() : null,
            weatherData: JSON.stringify(entry.weatherData)
        }));

        if (format === 'csv') {
            const parser = new Parser();
            const csv = parser.parse(cleanedData);
            res.header('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="weather_data.csv"');
            return res.send(csv);
        }

        if (format === 'json') {
            res.header('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', 'attachment; filename="weather_data.json"');
            return res.send(JSON.stringify(cleanedData, null, 2));
        }
        
        return res.status(400).json({ error: 'Invalid format. Supported formats are csv and json' });
    }catch (error) {
        console.error('Error exporting weather data:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
