const express = require('express')
const router = express.Router()
const { generateDemandForecast } = require('../data/mockData')

// Get demand forecast for all products
router.get('/', (req, res) => {
  try {
    const { months = 12 } = req.query
    const forecastData = generateDemandForecast()
    
    // Limit to requested months
    const limitedData = forecastData.slice(0, parseInt(months))
    
    res.json({
      success: true,
      data: limitedData,
      period: `${months} months`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get forecast for a specific product
router.get('/product/:productName', (req, res) => {
  try {
    const { productName } = req.params
    const { months = 12 } = req.query
    
    const forecastData = generateDemandForecast()
    const limitedData = forecastData.slice(0, parseInt(months))
    
    // Filter data for specific product
    const productData = limitedData.map(item => ({
      month: item.month,
      date: item.date,
      demand: item[productName] || 0
    }))
    
    if (productData.every(item => item.demand === 0)) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      })
    }
    
    res.json({
      success: true,
      product: productName,
      data: productData,
      period: `${months} months`,
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

