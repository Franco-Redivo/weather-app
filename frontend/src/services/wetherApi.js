import api from "./axios";


export const fetchWeatherForecast = async (location) => {
  try {
    const response = await api.post(`/weather`, { location } );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error fetching weather forecast", { cause: error });
  }
};
