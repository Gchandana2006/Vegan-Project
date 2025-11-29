import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  TrendingUp,
  People,
  LocalGroceryStore,
  Nature,
  ShowChart,
  LocationOn,
} from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { getMarketMetrics, getTimeSeriesData, getRegionalTrends } from '../services/api'

function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [timeSeriesData, setTimeSeriesData] = useState([])
  const [regions, setRegions] = useState([])
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
        
        const [metricsRes, timeSeriesRes, regionalRes] = await Promise.all([
          getMarketMetrics(),
          getTimeSeriesData(30),
          getRegionalTrends(),
        ])
        
        if (!isMounted) return
        
        // Set data only if responses are valid
        if (metricsRes && metricsRes.data) {
          setMetrics(metricsRes.data)
        }
        if (timeSeriesRes && timeSeriesRes.data && Array.isArray(timeSeriesRes.data)) {
          setTimeSeriesData(timeSeriesRes.data)
        }
        if (regionalRes && regionalRes.data && Array.isArray(regionalRes.data)) {
          setRegions(regionalRes.data)
        }
        
        setError(null)
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load dashboard data. Please make sure the backend server is running.')
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

  if (!metrics) {
    return null
  }

  const metricCards = [
    {
      title: 'Total Market Size',
      value: `$${(metrics.totalMarketSize / 1000000).toFixed(1)}M`,
      icon: <LocalGroceryStore />,
      color: '#2e7d32',
      change: `+${metrics.growthRate}%`,
      trend: 'up',
    },
    {
      title: 'Active Consumers',
      value: `${(metrics.activeConsumers / 1000000).toFixed(1)}M`,
      icon: <People />,
      color: '#4caf50',
      change: '+12.3%',
      trend: 'up',
    },
    {
      title: 'Market Growth',
      value: `${metrics.growthRate}%`,
      icon: <TrendingUp />,
      color: '#66bb6a',
      change: '+2.1%',
      trend: 'up',
    },
    {
      title: 'Market Penetration',
      value: `${metrics.marketPenetration}%`,
      icon: <Nature />,
      color: '#81c784',
      change: '+3.5%',
      trend: 'up',
    },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          Vegan Market Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-driven insights for sustainable plant-based market growth
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metricCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderLeft: `4px solid ${card.color}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ bgcolor: card.color, width: 56, height: 56 }}>
                    {card.icon}
                  </Avatar>
                  <Chip
                    label={card.change}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Market Demand Trend (Last 30 Days)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#2e7d32"
                    strokeWidth={2}
                    name="Demand"
                  />
                  <Line
                    type="monotone"
                    dataKey="supply"
                    stroke="#66bb6a"
                    strokeWidth={2}
                    name="Supply"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Top Products
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Plant-Based Milk</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>42%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={42} sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0' }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Plant-Based Meat</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>35%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={35} sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0' }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Plant-Based Cheese</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>15%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={15} sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0' }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Plant-Based Paneer</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>8%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={8} sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Regional Consumption Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" fill="#2e7d32" name="Consumption (tons)" />
                  <Bar dataKey="growth" fill="#66bb6a" name="Growth %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard

