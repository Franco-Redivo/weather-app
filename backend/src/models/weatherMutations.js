import prisma from './client.js';

async function createWeatherEntry(location, latitude, longitude, startDate, endDate, weatherData, videos) {
    return await prisma.weatherEntry.create({
        data: {
            location,
            latitude,
            longitude,
            startDate,
            endDate,
            weatherData,
            videos
        }
    });
}

async function updateWeatherEntry(id, location, latitude, longitude, startDate, endDate, weatherData, videos) {
    return await prisma.weatherEntry.update({
        where: { id: parseInt(id) },
        data: {
            location,
            latitude,
            longitude,
            startDate,
            endDate,
            weatherData,
            videos
        }
    });
}

async function deleteWeatherEntry(id) {
    return await prisma.weatherEntry.delete({
        where: { id: parseInt(id) }
    });
}

const weatherMutations = {
    createWeatherEntry,
    updateWeatherEntry,
    deleteWeatherEntry
}

export default weatherMutations;