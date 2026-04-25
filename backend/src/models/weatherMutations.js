import prisma from './client.js';

function toDateTimeOrThrow(value, fieldName) {
    if (value === undefined || value === null) {
        return value;
    }

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`${fieldName} must be a valid ISO-8601 DateTime or parseable date`);
    }

    return date;
}

async function createWeatherEntry(location, latitude, longitude, startDate, endDate, weatherData, videos) {
    const normalizedStartDate = toDateTimeOrThrow(startDate, 'startDate');
    const normalizedEndDate = toDateTimeOrThrow(endDate, 'endDate');

    return await prisma.weatherQuery.create({
        data: {
            location,
            latitude,
            longitude,
            startDate: normalizedStartDate,
            endDate: normalizedEndDate,
            weatherData,
            videos
        }
    });
}

async function updateWeatherEntry(id, location, latitude, longitude, startDate, endDate, weatherData, videos) {
    const normalizedStartDate = toDateTimeOrThrow(startDate, 'startDate');
    const normalizedEndDate = toDateTimeOrThrow(endDate, 'endDate');

    return await prisma.weatherQuery.update({
        where: { id: parseInt(id) },
        data: {
            location,
            latitude,
            longitude,
            startDate: normalizedStartDate,
            endDate: normalizedEndDate,
            weatherData,
            videos
        }
    });
}

async function deleteWeatherEntry(id) {
    return await prisma.weatherQuery.delete({
        where: { id: parseInt(id) }
    });
}

const weatherMutations = {
    createWeatherEntry,
    updateWeatherEntry,
    deleteWeatherEntry
}

export default weatherMutations;