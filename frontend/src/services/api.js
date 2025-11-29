// API service for Vegan Market Analytics Platform

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper function for API calls with timeout
const fetchAPI = async (endpoint, options = {}) => {
  const timeout = 10000 // 10 seconds timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: errorText || `API Error: ${response.status} ${response.statusText}` }
      }
      throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout: The server took too long to respond. Please check if the backend is running at ${API_BASE_URL}`)
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Cannot connect to backend server. Please make sure the backend is running at ${API_BASE_URL}`)
    }
    
    throw error
  }
}

// Regional Trends API
export const getRegionalTrends = async () => {
  return fetchAPI('/regional-trends')
}

export const getRegionalTrendByCode = async (regionCode) => {
  return fetchAPI(`/regional-trends/${regionCode}`)
}

// Demand Forecast API
export const getDemandForecast = async (months = 12) => {
  return fetchAPI(`/demand-forecast?months=${months}`)
}

export const getProductForecast = async (productName, months = 12) => {
  return fetchAPI(`/demand-forecast/product/${encodeURIComponent(productName)}?months=${months}`)
}

// Cultivation Areas API
export const getCultivationAreas = async () => {
  return fetchAPI('/cultivation-areas')
}

export const getCultivationAreaById = async (id) => {
  return fetchAPI(`/cultivation-areas/${id}`)
}

export const getCultivationAreasBySuitability = async (minScore = 0, maxScore = 100) => {
  return fetchAPI(`/cultivation-areas/filter/suitability?minScore=${minScore}&maxScore=${maxScore}`)
}

// Consumer Insights API
export const getConsumerInsights = async () => {
  return fetchAPI('/consumer-insights')
}

export const getConsumerInsightCategory = async (category) => {
  return fetchAPI(`/consumer-insights/${category}`)
}

// Market Metrics API
export const getMarketMetrics = async () => {
  return fetchAPI('/market-metrics')
}

export const getTimeSeriesData = async (days = 30) => {
  return fetchAPI(`/market-metrics/time-series?days=${days}`)
}

export const getMarketMetric = async (metricName) => {
  return fetchAPI(`/market-metrics/${metricName}`)
}

// Health check
export const checkAPIHealth = async () => {
  return fetchAPI('/health')
}

