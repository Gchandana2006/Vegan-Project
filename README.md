# 🌱 Vegan Market Analytics Platform

AI-driven system for analyzing regional consumption trends, predicting future demand for vegan products, and identifying optimal cultivation areas.

## 📁 Project Structure

```
Project/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── services/      # API service layer
│   ├── package.json
│   └── vercel.json        # Vercel deployment config
│
├── backend/           # Node.js + Express backend API
│   ├── routes/        # API route handlers
│   ├── data/          # Mock data generators
│   ├── server.js      # Express server
│   ├── package.json
│   └── render.yaml    # Render deployment config
│
└── DEPLOYMENT.md      # Complete deployment guide
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🌐 Deployment

### Quick Deployment Guide

See `QUICK_DEPLOY.md` for step-by-step deployment instructions.

### Detailed Guides

- **Frontend (Vercel)**: See `VERCEL_DEPLOYMENT.md`
- **Backend (Render)**: See `RENDER_DEPLOYMENT.md`
- **Complete Guide**: See `DEPLOYMENT.md`

## 📦 Features

- 📊 **Dashboard**: Market metrics, demand trends, regional consumption
- 📈 **Regional Trends**: Consumption patterns across regions
- 🔮 **Demand Forecast**: AI-powered demand predictions
- 🌍 **Cultivation Areas**: Optimal locations for crop cultivation
- 👥 **Consumer Insights**: Demographics, motivations, behavior patterns

## 🛠️ Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- Recharts for data visualization
- React Router for navigation
- Vite for build tooling

### Backend
- Node.js
- Express.js
- CORS enabled
- RESTful API architecture

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## 🔗 API Endpoints

- `GET /api/health` - Health check
- `GET /api/market-metrics` - Market metrics
- `GET /api/regional-trends` - Regional trends
- `GET /api/demand-forecast` - Demand forecasts
- `GET /api/cultivation-areas` - Cultivation areas
- `GET /api/consumer-insights` - Consumer insights

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Need help with deployment?** Check the `DEPLOYMENT.md` file for detailed instructions.

