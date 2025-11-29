import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { TrendingUp, TrendingDown, LocationOn } from '@mui/icons-material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { getRegionalTrends } from '../services/api'

const COLORS = ['#2e7d32', '#4caf50', '#66bb6a', '#81c784', '#a5d6a7']

function RegionalTrends() {
  const [regions, setRegions] = useState([])
  const [regionalProductData, setRegionalProductData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    let isFetching = false
    let loadingCleared = false
    
    // Safety timeout - ensure loading is cleared after 15 seconds
    const safetyTimeout = setTimeout(() => {
      if (isMounted && !loadingCleared) {
        loadingCleared = true
        setLoading(false)
        setError('Request took too long. Please check your network connection and backend server.')
      }
    }, 15000)

    const fetchData = async () => {
      // Prevent duplicate calls
      if (isFetching) return
      isFetching = true
      try {
        setLoading(true)
        setError(null)
        const response = await getRegionalTrends()
        
        if (!isMounted) return
        
        // Handle response - be more lenient with validation
        if (response) {
          // Set regions data
          if (response.data) {
            setRegions(Array.isArray(response.data) ? response.data : [])
          }
          
          // Set regional product data
          if (response.regionalProductData) {
            setRegionalProductData(Array.isArray(response.regionalProductData) ? response.regionalProductData : [])
          }
          
          setError(null)
        } else {
          setRegions([])
          setRegionalProductData([])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load regional trends data. Please make sure the backend server is running.')
          setRegions([])
          setRegionalProductData([])
        }
      } finally {
        clearTimeout(safetyTimeout)
        isFetching = false
        if (isMounted) {
          loadingCleared = true
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      clearTimeout(safetyTimeout)
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
        <Typography variant="body2" sx={{ mt: 2 }}>
          Check the browser console (F12) for more details.
        </Typography>
      </Box>
    )
  }

  // Show message if no data
  if (regions.length === 0 && regionalProductData.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          No regional trends data available. Please check if the backend server is running.
        </Alert>
      </Box>
    )
  }

  const pieData = regions.map((region) => ({
    name: region.name,
    value: region.consumption,
  }))

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Regional Consumption Trends
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analyze consumption patterns across different regions and products
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Regional Consumption Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" fill="#2e7d32" name="Consumption (tons)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Market Share by Region
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {regionalProductData.map((region) => (
          <Grid item xs={12} md={6} key={region.code}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {region.name}
                  </Typography>
                  <Chip
                    label={`${region.growth}% Growth`}
                    color="success"
                    size="small"
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={region.products}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="consumption" fill="#4caf50" name="Consumption (tons)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Regional Product Performance
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Consumption (tons)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Market Share (%)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {regionalProductData.flatMap((region) =>
                  region.products.map((product, idx) => (
                    <TableRow key={`${region.code}-${idx}`} hover>
                      <TableCell>{region.name}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.consumption.toLocaleString()}</TableCell>
                      <TableCell align="right">{product.marketShare.toFixed(1)}%</TableCell>
                      <TableCell align="center">
                        {product.trend === 'up' ? (
                          <TrendingUp sx={{ color: 'success.main' }} />
                        ) : (
                          <TrendingDown sx={{ color: 'error.main' }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RegionalTrends

