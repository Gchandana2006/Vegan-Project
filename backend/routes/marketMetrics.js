const express = require('express')
const router = express.Router()
const { generateMarketMetrics, generateTimeSeriesData } = require('../data/mockData')

// Get all market metrics
router.get('/', (req, res) => {
  try {
    const metrics = generateMarketMetrics()
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get time series data
router.get('/time-series', (req, res) => {
  try {
    const { days = 30 } = req.query
    const timeSeriesData = generateTimeSeriesData(parseInt(days))
    
    res.json({
      success: true,
      period: `${days} days`,
      data: timeSeriesData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get specific metric
router.get('/:metricName', (req, res) => {
  try {
    const { metricName } = req.params
    const metrics = generateMarketMetrics()
    
    if (!metrics.hasOwnProperty(metricName)) {
      return res.status(404).json({
        success: false,
        error: 'Metric not found',
        availableMetrics: Object.keys(metrics)
      })
    }
    
    res.json({
      success: true,
      metric: metricName,
      value: metrics[metricName],
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router

