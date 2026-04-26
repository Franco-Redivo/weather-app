import axios from 'axios';

const API_URL = 'https://api.open-meteo.com/v1/forecast';

export const getCurrentWeather = async (latitude, longitude) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto&past_days=0&forecast_days=0`
        const response = await axios.get(url);
        return {
            current: response.data.current,
            location: {
                latitude,
                longitude
            }
        }
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
}

export const getWeatherForecast = async (latitude, longitude) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&current=temperature_2m,apparent_temperature,is_day,precipitation,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto&past_days=0&forecast_days=5`
        const response = await axios.get(url);
        return {
            current: response.data.current,
            daily: response.data.daily,
            hourly: response.data.hourly,
            location: {
                latitude,
                longitude
            }
        }
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw error;
    }
}

export const getHistoricalWeather = async (latitude, longitude, startDate, endDate) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,precipitation_sum&timezone=auto&start_date=${startDate}&end_date=${endDate}`
        const response = await axios.get(url);
        return {
            daily: response.data.daily,
            location: {
                latitude,
                longitude
            }
        }
    } catch (error) {
        console.error('Error fetching historical weather:', error);
        throw error;
    }
}