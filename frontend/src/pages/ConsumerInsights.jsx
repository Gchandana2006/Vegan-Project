import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  People,
  Favorite,
  ShoppingCart,
  Store,
  Warning,
} from '@mui/icons-material'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { getConsumerInsights } from '../services/api'

const COLORS = ['#2e7d32', '#4caf50', '#66bb6a', '#81c784', '#a5d6a7']

function ConsumerInsights() {
  const [insights, setInsights] = useState(null)
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
        const response = await getConsumerInsights()
        
        if (!isMounted) return
        
        if (response && response.data) {
          setInsights(response.data)
          setError(null)
        } else {
          throw new Error('Invalid response format from API')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load consumer insights data. Please make sure the backend server is running.')
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

  if (!insights) {
    return null
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Consumer Insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Understanding consumer behavior, demographics, and preferences in the vegan market
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <People sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Demographics
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insights.demographics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#2e7d32" name="Percentage (%)" />
                </BarChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {insights.demographics.map((demo) => (
                  <Chip
                    key={demo.age}
                    label={`${demo.label}: ${demo.percentage}%`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Favorite sx={{ color: 'error.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Primary Motivations
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insights.motivations} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="reason" type="category" tick={{ fontSize: 12 }} width={150} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#4caf50" name="Percentage (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShoppingCart sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Purchase Frequency
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insights.purchaseFrequency}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ frequency, percentage }) => `${frequency}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {insights.purchaseFrequency.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Store sx={{ color: 'secondary.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Preferred Channels
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insights.preferredChannels}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ channel, percentage }) => `${channel}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {insights.preferredChannels.map((entry, index) => (
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

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Warning sx={{ color: 'warning.main', mr: 1, fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Top Consumer Concerns
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={insights.topConcerns} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="concern" type="category" tick={{ fontSize: 12 }} width={180} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#66bb6a" name="Percentage (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Key Insight #1
              </Typography>
              <Typography variant="body2">
                Gen Z and Millennials together represent 63% of the vegan market, 
                indicating strong future growth potential.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Key Insight #2
              </Typography>
              <Typography variant="body2">
                Environmental impact is the top motivation (72%), followed closely 
                by health benefits (68%), showing dual-value proposition.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Key Insight #3
              </Typography>
              <Typography variant="body2">
                60% of consumers purchase vegan products 2-3 times per week or more, 
                indicating high engagement and repeat purchase behavior.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConsumerInsights

