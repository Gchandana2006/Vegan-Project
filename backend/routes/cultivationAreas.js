const express = require('express')
const router = express.Router()
const { generateCultivationAreas } = require('../data/mockData')

// Get all cultivation areas
router.get('/', (req, res) => {
  try {
    const areas = generateCultivationAreas()
    res.json({
      success: true,
      count: areas.length,
      data: areas,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get a specific cultivation area by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const areas = generateCultivationAreas()
    
    const area = areas.find(a => a.id === parseInt(id))
    
    if (!area) {
      return res.status(404).json({
        success: false,
        error: 'Cultivation area not found'
      })
    }
    
    res.json({
      success: true,
      data: area,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get areas filtered by suitability score
router.get('/filter/suitability', (req, res) => {
  try {
    const { minScore = 0, maxScore = 100 } = req.query
    const areas = generateCultivationAreas()
    
    const filteredAreas = areas.filter(
      area => area.suitability >= parseInt(minScore) && 
              area.suitability <= parseInt(maxScore)
    )
    
    res.json({
      success: true,
      count: filteredAreas.length,
      filter: {
        minScore: parseInt(minScore),
        maxScore: parseInt(maxScore)
      },
      data: filteredAreas,
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

