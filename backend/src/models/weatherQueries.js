import prisma from './client.js';

async function getAllWeatherEntries() {
    return await prisma.weatherQuery.findMany();
}

async function getWeatherEntryById(id) {
    return await prisma.weatherQuery.findUnique({
        where: { id: parseInt(id) }
    });
}

const weatherQueries = {
    getAllWeatherEntries,
    getWeatherEntryById
}

export default weatherQueries;