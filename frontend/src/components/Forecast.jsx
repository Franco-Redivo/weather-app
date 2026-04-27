import { getWeatherDescriptionAndIcon } from "../utils/weatherCodes";

const Forecast = ({ data }) => {
    const daily = data?.weatherData.daily || {};
    const formatDay = (dateString) =>
        new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(
            new Date(dateString)
        );

    return (
        <div className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/30 backdrop-blur">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">5-Day Forecast</h2>
                    <p className="text-sm text-slate-400">Browse the days below</p>
                </div>
            </div>

            <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:flex xl:flex-nowrap xl:items-center xl:justify-start xl:overflow-x-auto xl:px-1 xl:pb-2">
                {daily.time?.map((date, index) => {
                    const { description, icon } = getWeatherDescriptionAndIcon(daily.weather_code?.[index]);
                    return (
                        <div
                            key={index}
                            className="flex min-h-72 flex-col rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-md shadow-slate-950/20 xl:min-w-45 xl:shrink-0"
                        >
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-100">{formatDay(date)}</p>
                                    <p className="text-xs text-slate-400">{date}</p>
                                </div>
                                <div className="text-3xl">{icon}</div>
                            </div>

                            <p className="text-sm text-slate-300">{description}</p>
                            <div className="mt-6 space-y-2 text-sm text-slate-200">
                                <p>High: {daily.temperature_2m_max?.[index]}°C</p>
                                <p>Low: {daily.temperature_2m_min?.[index]}°C</p>
                                <p>Rain: {daily.precipitation_sum?.[index]} mm</p>
                                <p>Rain Chance: {daily.precipitation_probability_max?.[index]}%</p>
                                <p>Wind: {daily.wind_speed_10m_max?.[index]} km/h</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;