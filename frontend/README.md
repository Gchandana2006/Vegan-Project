# Vegan Market Analytics Frontend

React-based frontend application for the Vegan Market Analytics Platform.

## Features

- **Dashboard**: Overview of market metrics, trends, and key insights
- **Regional Trends**: Analyze consumption patterns across different regions and products
- **Demand Forecast**: AI-powered predictions for future vegan product demand
- **Cultivation Areas**: Identify optimal locations for plant-based crop cultivation
- **Consumer Insights**: Understand consumer behavior, demographics, and preferences

## Technology Stack

- React 18
- Material-UI (MUI) v5
- React Router v6
- Recharts for data visualization
- Vite for build tooling

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with navigation
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── RegionalTrends.jsx   # Regional consumption analysis
│   │   ├── DemandForecast.jsx  # Demand forecasting
│   │   ├── CultivationAreas.jsx # Optimal cultivation areas
│   │   └── ConsumerInsights.jsx # Consumer behavior insights
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## Configuration

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

## Target Audience

- Vegan & GenZ Consumers
- Plant-Based Food Manufacturers
- Nutrition and Health Conscious Consumers

## License

MIT

