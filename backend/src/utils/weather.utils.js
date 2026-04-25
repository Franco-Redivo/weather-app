import axios from 'axios';

export const isInTimeInterval = (start, end) => {
    const maxRange = 16;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();

    if (startDate > endDate) {
        throw new Error("Start date must be before end date");
    }

    const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (diffDays > maxRange) {
        throw new Error("Date range exceeds 16 days");
    }

    const minDate = new Date(today);
    minDate.setDate(today.getDate() - maxRange);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxRange);

    if (startDate < minDate || endDate > maxDate) {
        throw new Error("Dates must be between 16 days before today and 16 days after today");
    }

    return true;

}

export const locationToCoordinates = async (location) => {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURI(location)}&count=1&language=en&format=json`;
        const response = await axios.get(url);
        if (response.data.results && response.data.results.length > 0) {
            const { latitude, longitude } = response.data.results[0];
            return { latitude, longitude };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching location coordinates:', error);
        throw error;

    }
}