import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  LocationOn,
  Agriculture,
  WaterDrop,
  WbSunny,
  LocalShipping,
  ExpandMore,
} from '@mui/icons-material'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { getCultivationAreas } from '../services/api'

function CultivationAreas() {
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    let isFetching = false

    const fetchData = async () => {
      // Prevent duplicate calls
      if (isFetching) return
      isFetching = true
      try {
        setLoading(true)
        setError(null)
        const response = await getCultivationAreas()
        
        if (!isMounted) return
        
        if (response && response.data && Array.isArray(response.data)) {
          setAreas(response.data)
          if (response.data.length > 0) {
            setSelectedArea(response.data[0])
          }
          setError(null)
        } else {
          throw new Error('Invalid response format from API')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load cultivation areas data. Please make sure the backend server is running.')
        }
      } finally {
        isFetching = false
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  // Safety check: if no areas, return early
  if (!areas || areas.length === 0 || !selectedArea) {
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Optimal Cultivation Areas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No cultivation areas data available.
        </Typography>
      </Box>
    )
  }

  const getSuitabilityColor = (score) => {
    if (score >= 90) return 'success'
    if (score >= 80) return 'info'
    return 'warning'
  }

  const radarData = [
    {
      subject: 'Soil Quality',
      value: selectedArea.factors.soilQuality,
      fullMark: 100,
    },
    {
      subject: 'Climate',
      value: selectedArea.factors.climate,
      fullMark: 100,
    },
    {
      subject: 'Water',
      value: selectedArea.factors.waterAvailability,
      fullMark: 100,
    },
    {
      subject: 'Infrastructure',
      value: selectedArea.factors.infrastructure,
      fullMark: 100,
    },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Optimal Cultivation Areas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-identified locations for optimal plant-based crop cultivation
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {areas.map((area) => (
          <Grid item xs={12} md={6} lg={4} key={area.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                border: selectedArea.id === area.id ? '2px solid' : '1px solid',
                borderColor: selectedArea.id === area.id ? 'primary.main' : 'divider',
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={() => setSelectedArea(area)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {area.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${area.suitability}%`}
                    color={getSuitabilityColor(area.suitability)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Agriculture sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Crop: {area.crop}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Current Production: {area.currentProduction.toLocaleString()} tons
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Potential: {area.potentialProduction.toLocaleString()} tons
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {area.products.map((product) => (
                    <Chip
                      key={product}
                      label={product}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Suitability Score
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={area.suitability}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: area.suitability >= 90 ? 'success.main' : area.suitability >= 80 ? 'info.main' : 'warning.main',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Suitability Factors - {selectedArea.name}
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#2e7d32"
                    fill="#4caf50"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <WaterDrop sx={{ color: 'info.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Soil Quality
                    </Typography>
                    <LinearProgress variant="determinate" value={selectedArea.factors.soilQuality} sx={{ mt: 0.5 }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedArea.factors.soilQuality}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <WbSunny sx={{ color: 'warning.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Climate Suitability
                    </Typography>
                    <LinearProgress variant="determinate" value={selectedArea.factors.climate} sx={{ mt: 0.5 }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedArea.factors.climate}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <WaterDrop sx={{ color: 'primary.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Water Availability
                    </Typography>
                    <LinearProgress variant="determinate" value={selectedArea.factors.waterAvailability} sx={{ mt: 0.5 }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedArea.factors.waterAvailability}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalShipping sx={{ color: 'secondary.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Infrastructure
                    </Typography>
                    <LinearProgress variant="determinate" value={selectedArea.factors.infrastructure} sx={{ mt: 0.5 }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedArea.factors.infrastructure}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Area Comparison
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Suitability</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Current Prod.</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Potential</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {areas.map((area) => (
                      <TableRow
                        key={area.id}
                        hover
                        onClick={() => setSelectedArea(area)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: selectedArea.id === area.id ? 'action.selected' : 'transparent',
                        }}
                      >
                        <TableCell>{area.name}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${area.suitability}%`}
                            color={getSuitabilityColor(area.suitability)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">{area.currentProduction.toLocaleString()}</TableCell>
                        <TableCell align="right">{area.potentialProduction.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3, width: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recommendations
              </Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Investment Priority
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Based on suitability scores and market demand, prioritize investment in 
                    {areas.filter(a => a.suitability >= 90).map(a => ` ${a.name}`).join(', ')} 
                    for maximum ROI.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Expansion Strategy
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Focus on areas with suitability scores above 85% and existing infrastructure 
                    to minimize initial investment and accelerate time-to-market.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CultivationAreas

