const express = require('express')
const router = express.Router()
const { generateRegionalData } = require('../data/mockData')

// Get all regional trends
router.get('/', (req, res) => {
  try {
    const data = generateRegionalData()
    res.json({
      success: true,
      data: data.regions,
      regionalProductData: data.regionalProductData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get trends for a specific region
router.get('/:regionCode', (req, res) => {
  try {
    const { regionCode } = req.params
    const { regionalProductData } = generateRegionalData()
    
    const regionData = regionalProductData.find(
      region => region.code.toLowerCase() === regionCode.toLowerCase()
    )
    
    if (!regionData) {
      return res.status(404).json({
        success: false,
        error: 'Region not found'
      })
    }
    
    res.json({
      success: true,
      data: regionData,
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

