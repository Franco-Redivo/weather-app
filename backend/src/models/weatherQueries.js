import prisma from './client.js';

async function getAllWeatherEntries() {
    return await prisma.weatherEntry.findMany();
}

async function getWeatherEntryById(id) {
    return await prisma.weatherEntry.findUnique({
        where: { id: parseInt(id) }
    });
}

const weatherQueries = {
    getAllWeatherEntries,
    getWeatherEntryById
}

export default weatherQueries;