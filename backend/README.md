# Vegan Market Analytics Backend API

RESTful API backend for the Vegan Market Analytics Platform.

## Features

- **Regional Trends API**: Get consumption patterns across different regions
- **Demand Forecast API**: Predict future demand for vegan products
- **Cultivation Areas API**: Get optimal cultivation locations and suitability data
- **Consumer Insights API**: Access consumer behavior and demographic data
- **Market Metrics API**: Retrieve market size, growth, and time series data

## Installation

```bash
cd backend
npm install
```

## Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Regional Trends
- `GET /api/regional-trends` - Get all regional trends
- `GET /api/regional-trends/:regionCode` - Get trends for specific region (NA, EU, APAC, LATAM, MEA)

### Demand Forecast
- `GET /api/demand-forecast` - Get forecast for all products (query: `?months=12`)
- `GET /api/demand-forecast/product/:productName` - Get forecast for specific product

### Cultivation Areas
- `GET /api/cultivation-areas` - Get all cultivation areas
- `GET /api/cultivation-areas/:id` - Get specific area by ID
- `GET /api/cultivation-areas/filter/suitability?minScore=80&maxScore=100` - Filter by suitability score

### Consumer Insights
- `GET /api/consumer-insights` - Get all consumer insights
- `GET /api/consumer-insights/:category` - Get specific category (demographics, motivations, purchaseFrequency, preferredChannels, topConcerns)

### Market Metrics
- `GET /api/market-metrics` - Get all market metrics
- `GET /api/market-metrics/time-series?days=30` - Get time series data
- `GET /api/market-metrics/:metricName` - Get specific metric

## Example Requests

```bash
# Get all regional trends
curl http://localhost:5000/api/regional-trends

# Get demand forecast for 6 months
curl http://localhost:5000/api/demand-forecast?months=6

# Get cultivation area by ID
curl http://localhost:5000/api/cultivation-areas/1

# Get consumer demographics
curl http://localhost:5000/api/consumer-insights/demographics

# Get market metrics
curl http://localhost:5000/api/market-metrics
```

## Response Format

All endpoints return JSON responses in the following format:

```json
{
  "success": true,
  "data": {...},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Technologies

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management

## Project Structure

```
backend/
├── routes/
│   ├── regionalTrends.js
│   ├── demandForecast.js
│   ├── cultivationAreas.js
│   ├── consumerInsights.js
│   └── marketMetrics.js
├── data/
│   └── mockData.js
├── server.js
├── package.json
└── README.md
```

## License

MIT

