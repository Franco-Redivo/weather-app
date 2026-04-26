# Weather App Frontend

React + Vite frontend for the Weather App.

This app lets users:
- Search for a city
- View current weather conditions
- View a 5-day forecast
- View related travel videos

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Axios

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm
- Backend API running locally at `http://localhost:3000`

The frontend currently calls:
- `http://localhost:3000/api/weather`

This is configured in `src/services/axios.js`.

## Installation

From the `frontend` folder:

```bash
npm install
```

## Run in Development

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Dependencies

Runtime dependencies:
- `react` `^19.2.5`
- `react-dom` `^19.2.5`
- `axios` `^1.15.2`
- `tailwindcss` `^4.2.4`
- `@tailwindcss/vite` `^4.2.4`

Dev dependencies:
- `vite` `^8.0.10`
- `@vitejs/plugin-react` `^6.0.1`
- `eslint` `^10.2.1`
- `@eslint/js` `^10.0.1`
- `eslint-plugin-react-hooks` `^7.1.1`
- `eslint-plugin-react-refresh` `^0.5.2`
- `globals` `^17.5.0`
- `@types/react` `^19.2.14`
- `@types/react-dom` `^19.2.3`

## Project Structure

```text
frontend/
	src/
		components/
			CurrentWeather.jsx
			ErrorMessage.jsx
			Forecast.jsx
			SearchBar.jsx
			Videos.jsx
		services/
			axios.js
			wetherApi.js
		utils/
			weatherCodes.js
		App.jsx
		main.jsx
		styles.css
```

## Notes

- Make sure the backend is started before searching for a city.
- If the backend host/port changes, update `baseURL` in `src/services/axios.js`.

