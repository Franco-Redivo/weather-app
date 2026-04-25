import { getWeatherDescriptionAndIcon } from "../utils/weatherCodes";

const CurrentWeather = ({ data }) => {
    const current = data?.weatherData.current || {};
    const { description, icon } = getWeatherDescriptionAndIcon(current.weather_code);
    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/30 backdrop-blur">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">Current Weather</h2>
                    <p className="text-sm text-slate-400">Live conditions right now</p>
                </div>
                <div className="text-4xl">{icon}</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">Temperature</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{current.temperature_2m}°C</p>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">Feels Like</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{current.apparent_temperature}°C</p>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">Precipitation</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{current.precipitation} mm</p>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm text-slate-400">Humidity</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{current.relative_humidity_2m}%</p>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4 sm:col-span-2">
                    <p className="text-sm text-slate-400">Wind Speed</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{current.wind_speed_10m} km/h</p>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Description</p>
                <p className="mt-1 text-base font-medium text-slate-100">{description}</p>
            </div>
        </div>
    );
}

export default CurrentWeather;