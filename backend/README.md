# Weather App Backend

Express.js backend API for the Weather App with Prisma ORM and PostgreSQL.

This API provides:
- Weather forecasting endpoints
- Weather history and queries
- YouTube video search for travel content
- Data persistence with PostgreSQL

## Tech Stack

- Node.js
- Express.js 5
- Prisma ORM 7
- PostgreSQL
- Open-Meteo API (weather data)
- YouTube API (video search)

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm
- PostgreSQL 12+ running locally
- YouTube API key (from Google Cloud Console)

## Installation

From the `backend` folder:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the backend folder:

```env
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/weatherdb"
YOUTUBE_API_KEY="your_youtube_api_key_here"
```

Replace:
- `username` and `password` with your PostgreSQL credentials
- `weatherdb` with your database name
- `your_youtube_api_key_here` with your YouTube API key

## Database Setup

Create the PostgreSQL database:

```bash
createdb weatherdb
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

This will:
1. Create all database tables based on `prisma/schema.prisma`
2. Generate the Prisma Client

Regenerate Prisma Client after schema changes:

```bash
npx prisma generate
```

## Run in Development

```bash
npm run dev
```

Uses nodemon to auto-restart on file changes. Server runs on `http://localhost:3000`.

## Run in Production

```bash
npm start
```

## API Endpoints

Base URL: `http://localhost:3000/api/weather`

### Create Weather Entry

**POST** `/`

Request body:
```json
{
  "location": "New York"
}
```

Returns current weather forecast and saves to database.

### Get All Weather Entries

**GET** `/`

Returns all weather queries stored in database.

### Get Weather Entry by ID

**GET** `/:id`

Returns a specific weather query by ID.

### Update Weather Entry

**PUT** `/:id`

Request body:
```json
{
  "location": "New York",
  "startDate": "2026-04-25",
  "endDate": "2026-05-01"
}
```

Updates weather entry for a location and date range.

### Delete Weather Entry

**DELETE** `/:id`

Deletes a weather query from database.

### Export Weather Data

**GET** `/export?format=csv` or `/export?format=json`

Exports all weather entries in CSV or JSON format.

## Dependencies

Runtime dependencies:
- `express` `^5.2.1`
- `@prisma/client` `^7.8.0`
- `@prisma/adapter-pg` `^7.8.0`
- `cors` `^2.8.6`
- `dotenv` `^17.4.2`
- `axios` `^1.15.2`
- `json2csv` `^6.0.0-alpha.2`

Dev dependencies:
- `prisma` `^7.8.0`
- `nodemon` `^3.1.14`

## Project Structure

```text
backend/
  prisma/
    schema.prisma
    migrations/
  src/
    app.js
    controllers/
      export.controller.js
      weather.controller.js
    models/
      client.js
      weatherMutations.js
      weatherQueries.js
    routes/
      weather.routes.js
    services/
      weather.service.js
      youtube.service.js
    utils/
      weather.utils.js
  server.js
  .env
```

## Database Schema

The `WeatherQuery` model stores:
- `id` - Auto-incremented primary key
- `location` - City name
- `latitude` / `longitude` - Coordinates
- `startDate` / `endDate` - Date range for query
- `weatherData` - Raw weather data (JSON)
- `videos` - Related YouTube videos (JSON)
- `createdAt` - Timestamp

## Notes

- Backend runs on port 3000 by default (configurable via `PORT` env var)
- Frontend expects API at `http://localhost:3000/api`
- YouTube API key is required for video search functionality
- All dates are stored in ISO-8601 format
- CORS is enabled for all origins (configure in `src/app.js` for production)

## Common Issues

**PostgreSQL connection error:**
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env` matches your setup

**YouTube API errors:**
- Check that `YOUTUBE_API_KEY` is set in `.env`
- Verify the API key has YouTube Data API v3 enabled

**Port already in use:**
- Change the `PORT` env var or kill the existing process on port 3000
