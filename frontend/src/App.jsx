import { useState } from 'react'
import SearchBar from './components/SearchBar'
import Forecast from './components/Forecast'
import CurrentWeather from './components/CurrentWeather'
import ErrorMessage from './components/ErrorMessage'
import { fetchWeatherForecast } from './services/wetherApi'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (location) => {
    try {
      setLoading(true);
      setError('');

      const result = await fetchWeatherForecast(location);
      setData(result);
    }catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-sky-300/80">Weather App</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple weather forecast</h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Search a city to see the current weather and a 5-day outlook.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <p className="text-sm text-slate-300">Loading...</p>}
        {error && <ErrorMessage message={error} />}

        {data && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <CurrentWeather data={data} />
            <Forecast data={data} />
          </div>
        )}
      </div>
    </div>
  )

}

export default App
