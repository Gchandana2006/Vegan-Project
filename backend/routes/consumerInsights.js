const express = require('express')
const router = express.Router()
const { generateConsumerInsights } = require('../data/mockData')

// Get all consumer insights
router.get('/', (req, res) => {
  try {
    const insights = generateConsumerInsights()
    res.json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get specific insight category
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params
    const insights = generateConsumerInsights()
    
    const validCategories = [
      'demographics',
      'motivations',
      'purchaseFrequency',
      'preferredChannels',
      'topConcerns'
    ]
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category',
        validCategories
      })
    }
    
    res.json({
      success: true,
      category,
      data: insights[category],
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

