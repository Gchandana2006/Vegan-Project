import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material'
import { ShowChart, TrendingUp, Warning } from '@mui/icons-material'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { getDemandForecast } from '../services/api'

function DemandForecast() {
  const [selectedProduct, setSelectedProduct] = useState('All Products')
  const [forecastData, setForecastData] = useState([])
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
        const response = await getDemandForecast(12)
        
        if (!isMounted) return
        
        if (response && response.data && Array.isArray(response.data)) {
          setForecastData(response.data)
          setError(null)
        } else {
          throw new Error('Invalid response format from API')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load demand forecast data. Please make sure the backend server is running.')
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

  const products = ['All Products', 'Plant-Based Meat', 'Plant-Based Milk', 'Plant-Based Paneer', 'Plant-Based Cheese']

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

  const getFilteredData = () => {
    if (selectedProduct === 'All Products') {
      return forecastData.map((item) => ({
        ...item,
        total: item['Plant-Based Meat'] + item['Plant-Based Milk'] + item['Plant-Based Paneer'] + item['Plant-Based Cheese'],
      }))
    }
    return forecastData
  }

  const data = getFilteredData()

  const calculateGrowthRate = () => {
    if (selectedProduct === 'All Products') {
      const first = data[0].total
      const last = data[data.length - 1].total
      return (((last - first) / first) * 100).toFixed(1)
    }
    const first = data[0][selectedProduct]
    const last = data[data.length - 1][selectedProduct]
    return (((last - first) / first) * 100).toFixed(1)
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Demand Forecasting
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered predictions for future vegan product demand
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShowChart sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Forecast Period
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    12 Months
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 1, fontSize: 32 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Expected Growth
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                    +{calculateGrowthRate()}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel>Select Product</InputLabel>
                <Select
                  value={selectedProduct}
                  label="Select Product"
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  {products.map((product) => (
                    <MenuItem key={product} value={product}>
                      {product}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" icon={<Warning />} sx={{ mb: 3 }}>
        Forecasts are based on historical data, market trends, and AI-driven predictive models. 
        Actual results may vary based on market conditions and external factors.
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {selectedProduct} Demand Forecast
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                {selectedProduct === 'All Products' ? (
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#2e7d32"
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                      name="Total Demand"
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedProduct}
                      stroke="#2e7d32"
                      strokeWidth={3}
                      name={selectedProduct}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Product Comparison Forecast
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Plant-Based Meat"
                    stroke="#2e7d32"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Plant-Based Milk"
                    stroke="#4caf50"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Plant-Based Paneer"
                    stroke="#66bb6a"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Plant-Based Cheese"
                    stroke="#81c784"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Forecast Insights
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Peak Demand Period
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expected peak demand in months 8-10, with a projected increase of 25-30% 
                    compared to baseline.
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Recommended Actions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Increase production capacity by 20% in Q3-Q4 to meet projected demand surge. 
                    Consider expanding cultivation areas in high-suitability regions.
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Risk Factors
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monitor supply chain disruptions and seasonal variations. Weather patterns 
                    may impact crop yields in key cultivation regions.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DemandForecast

