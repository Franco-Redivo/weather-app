# Weather App

A fullstack weather application for the **Product Manager Accelerator Internship Tech Assessment**.

This is a full-stack web application that provides real-time weather forecasts and travel recommendations. Users can search for any location, view current weather conditions and a 5-day forecast, and discover YouTube travel videos for their destination.

## Project Overview

- **Frontend:** React SPA with Tailwind CSS dark theme
- **Backend:** Express.js REST API with Prisma ORM
- **Database:** PostgreSQL for persistent storage
- **APIs:** Open-Meteo (weather) and YouTube (travel videos)

## Key Features

✅ Real-time weather forecasting via Open-Meteo API  
✅ 5-day weather forecast with hourly data  
✅ YouTube travel video recommendations  
✅ Weather query history and management  
✅ CSV/JSON data export  
✅ Responsive design (mobile, tablet, desktop)  
✅ Dark theme UI with Tailwind CSS  

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL 12+ running locally
- YouTube API key (from Google Cloud Console)

### Setup

1. **Clone or navigate to the project:**
   ```bash
   cd weather-app
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file in `backend/`:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://username:password@localhost:5432/weatherdb"
   YOUTUBE_API_KEY="your_key_here"
   ```
   
   Initialize database:
   ```bash
   createdb weatherdb
   npx prisma migrate dev
   ```
   
   Start backend (from `backend/` folder):
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   ```
   
   Start frontend (from `frontend/` folder):
   ```bash
   npm run dev
   ```

4. **Access the App:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000/api`

## Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│    http://localhost:5173                │
│  - SearchBar.jsx                        │
│  - CurrentWeather.jsx                   │
│  - Forecast.jsx (5-day)                 │
│  - Videos.jsx (YouTube)                 │
└────────────────┬────────────────────────┘
                 │ Axios HTTP Requests
                 ▼
┌─────────────────────────────────────────┐
│     Backend (Express.js REST API)       │
│    http://localhost:3000/api/weather    │
│  - POST / (create weather query)        │
│  - GET / (list all queries)             │
│  - GET /:id (get by ID)                 │
│  - PUT /:id (update query)              │
│  - DELETE /:id (delete query)           │
│  - GET /export (CSV/JSON export)        │
└────────────────┬────────────────────────┘
                 │ Prisma ORM
                 ▼
┌─────────────────────────────────────────┐
│        PostgreSQL Database              │
│  - WeatherQuery (store queries)         │
│  - Relationships & history              │
└─────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React** 19 - UI component library
- **Vite** 8 - Build tool
- **Tailwind CSS** 4 - Utility-first styling
- **Axios** - HTTP client
- **JavaScript (ESM)** - Module system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 5 - Web framework
- **Prisma** 7 - ORM
- **PostgreSQL** - Database
- **Axios** - HTTP client for external APIs
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Project Structure

```
weather-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── Forecast.jsx
│   │   │   └── Videos.jsx
│   │   ├── services/
│   │   │   ├── axios.js
│   │   │   └── wetherApi.js
│   │   ├── App.jsx
│   │   └── styles.css
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── export.controller.js
│   │   │   └── weather.controller.js
│   │   ├── models/
│   │   │   ├── client.js (Prisma)
│   │   │   ├── weatherMutations.js
│   │   │   └── weatherQueries.js
│   │   ├── routes/
│   │   │   └── weather.routes.js
│   │   ├── services/
│   │   │   ├── weather.service.js
│   │   │   └── youtube.service.js
│   │   ├── utils/
│   │   │   └── weather.utils.js
│   │   └── app.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── server.js
│   ├── package.json
│   ├── .env (create this)
│   └── README.md
│
└── README.md (this file)
```

## Detailed Setup Guides

- **[Frontend Setup](./frontend/README.md)** - React, Vite, Tailwind CSS configuration
- **[Backend Setup](./backend/README.md)** - Express, Prisma, PostgreSQL configuration

## API Endpoints

All endpoints at `http://localhost:3000/api/weather`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create weather query for location |
| GET | `/` | List all weather queries |
| GET | `/:id` | Get weather query by ID |
| PUT | `/:id` | Update weather query |
| DELETE | `/:id` | Delete weather query |
| GET | `/export?format=csv\|json` | Export all queries |

## Development Notes

- **Data Flow:** Frontend searches location → Backend queries Open-Meteo API → Stores in PostgreSQL → Returns current weather + YouTube videos
- **Styling:** Dark theme with Tailwind CSS utility classes, responsive breakpoints (sm, lg, xl)
- **Database:** WeatherQuery model stores location, date range, weather data, and video recommendations
- **Error Handling:** Both frontend and backend include validation and error messages

## Common Issues & Solutions

**Backend won't start:**
- Ensure PostgreSQL is running: `pg_isrunning`
- Check DATABASE_URL in `.env`
- Verify migrations ran: `npx prisma migrate status`

**Frontend can't connect to backend:**
- Ensure backend is running on port 3000
- Check CORS is enabled in `backend/src/app.js`
- Verify axios baseURL in `frontend/src/services/axios.js`

**Port conflicts:**
- Frontend runs on `5173` (Vite default)
- Backend runs on `3000` (configurable via PORT env var)
- Change ports if already in use

## Environment Variables

### Backend (.env)
```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/weatherdb"
YOUTUBE_API_KEY="your_youtube_api_key"
```

### Frontend
No `.env` needed - API baseURL is configured in `src/services/axios.js`

## Dependencies Overview

See individual README files for complete dependency lists:
- [Frontend dependencies](./frontend/README.md#dependencies)
- [Backend dependencies](./backend/README.md#dependencies)

## Production Deployment

For production deployment:
1. Build frontend: `cd frontend && npm run build`
2. Serve frontend as static files
3. Run backend on production server
4. Update CORS configuration in `backend/src/app.js`
5. Use environment secrets for API keys and database URL
6. Set up PostgreSQL with backup strategy

## License

ISC

---

**Created for:** Product Manager Accelerator Internship Tech Assessment  
**Last Updated:** April 2026
