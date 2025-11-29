const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/regional-trends', require('./routes/regionalTrends'))
app.use('/api/demand-forecast', require('./routes/demandForecast'))
app.use('/api/cultivation-areas', require('./routes/cultivationAreas'))
app.use('/api/consumer-insights', require('./routes/consumerInsights'))
app.use('/api/market-metrics', require('./routes/marketMetrics'))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vegan Market Analytics API is running',
    timestamp: new Date().toISOString()
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Vegan Market Analytics API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      regionalTrends: '/api/regional-trends',
      demandForecast: '/api/demand-forecast',
      cultivationAreas: '/api/cultivation-areas',
      consumerInsights: '/api/consumer-insights',
      marketMetrics: '/api/market-metrics'
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📊 Vegan Market Analytics API v1.0.0`)
})

