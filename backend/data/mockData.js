// Mock data generators for Vegan Market Analytics Backend API

exports.generateRegionalData = () => {
  const regions = [
    { name: 'North America', code: 'NA', consumption: 45000, growth: 12.5 },
    { name: 'Europe', code: 'EU', consumption: 38000, growth: 15.2 },
    { name: 'Asia Pacific', code: 'APAC', consumption: 52000, growth: 18.7 },
    { name: 'Latin America', code: 'LATAM', consumption: 15000, growth: 22.3 },
    { name: 'Middle East & Africa', code: 'MEA', consumption: 8000, growth: 25.1 },
  ]

  const products = ['Plant-Based Meat', 'Plant-Based Milk', 'Plant-Based Paneer', 'Plant-Based Cheese']
  
  const regionalProductData = regions.map(region => ({
    ...region,
    products: products.map(product => ({
      name: product,
      consumption: Math.floor(Math.random() * 15000) + 5000,
      marketShare: Math.random() * 30 + 10,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    })),
  }))

  return { regions, regionalProductData }
}

exports.generateDemandForecast = () => {
  const months = []
  const currentDate = new Date()
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate)
    date.setMonth(currentDate.getMonth() + i)
    months.push({
      month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      date: date.toISOString(),
      'Plant-Based Meat': Math.floor(Math.random() * 5000) + 20000 + (i * 500),
      'Plant-Based Milk': Math.floor(Math.random() * 8000) + 35000 + (i * 800),
      'Plant-Based Paneer': Math.floor(Math.random() * 3000) + 12000 + (i * 300),
      'Plant-Based Cheese': Math.floor(Math.random() * 4000) + 15000 + (i * 400),
    })
  }

  return months
}

exports.generateCultivationAreas = () => {
  return [
    {
      id: 1,
      name: 'Soybean Fields - Midwest USA',
      location: { lat: 41.8781, lng: -87.6298 },
      crop: 'Soybean',
      suitability: 95,
      currentProduction: 125000,
      potentialProduction: 180000,
      products: ['Plant-Based Meat', 'Plant-Based Milk'],
      factors: {
        soilQuality: 92,
        climate: 88,
        waterAvailability: 85,
        infrastructure: 90,
      },
    },
    {
      id: 2,
      name: 'Almond Orchards - California',
      location: { lat: 36.7783, lng: -119.4179 },
      crop: 'Almond',
      suitability: 88,
      currentProduction: 98000,
      potentialProduction: 145000,
      products: ['Plant-Based Milk'],
      factors: {
        soilQuality: 85,
        climate: 95,
        waterAvailability: 75,
        infrastructure: 92,
      },
    },
    {
      id: 3,
      name: 'Pea Fields - Canada',
      location: { lat: 51.0447, lng: -114.0719 },
      crop: 'Pea',
      suitability: 92,
      currentProduction: 75000,
      potentialProduction: 110000,
      products: ['Plant-Based Meat', 'Plant-Based Paneer'],
      factors: {
        soilQuality: 90,
        climate: 88,
        waterAvailability: 92,
        infrastructure: 85,
      },
    },
    {
      id: 4,
      name: 'Cashew Plantations - India',
      location: { lat: 19.0760, lng: 72.8777 },
      crop: 'Cashew',
      suitability: 85,
      currentProduction: 65000,
      potentialProduction: 95000,
      products: ['Plant-Based Cheese', 'Plant-Based Milk'],
      factors: {
        soilQuality: 88,
        climate: 90,
        waterAvailability: 80,
        infrastructure: 78,
      },
    },
    {
      id: 5,
      name: 'Oat Fields - Northern Europe',
      location: { lat: 59.3293, lng: 18.0686 },
      crop: 'Oat',
      suitability: 90,
      currentProduction: 110000,
      potentialProduction: 160000,
      products: ['Plant-Based Milk'],
      factors: {
        soilQuality: 92,
        climate: 85,
        waterAvailability: 90,
        infrastructure: 95,
      },
    },
    {
      id: 6,
      name: 'Coconut Groves - Southeast Asia',
      location: { lat: 1.3521, lng: 103.8198 },
      crop: 'Coconut',
      suitability: 87,
      currentProduction: 85000,
      potentialProduction: 125000,
      products: ['Plant-Based Milk', 'Plant-Based Cheese'],
      factors: {
        soilQuality: 85,
        climate: 95,
        waterAvailability: 90,
        infrastructure: 82,
      },
    },
  ]
}

exports.generateConsumerInsights = () => {
  return {
    demographics: [
      { age: '18-24', percentage: 35, label: 'Gen Z' },
      { age: '25-34', percentage: 28, label: 'Millennials' },
      { age: '35-44', percentage: 20, label: 'Gen X' },
      { age: '45-54', percentage: 12, label: 'Boomers' },
      { age: '55+', percentage: 5, label: 'Seniors' },
    ],
    motivations: [
      { reason: 'Health Benefits', percentage: 68 },
      { reason: 'Environmental Impact', percentage: 72 },
      { reason: 'Animal Welfare', percentage: 65 },
      { reason: 'Taste Preference', percentage: 45 },
      { reason: 'Cost Effectiveness', percentage: 38 },
    ],
    purchaseFrequency: [
      { frequency: 'Daily', percentage: 25 },
      { frequency: '2-3 times/week', percentage: 35 },
      { frequency: 'Weekly', percentage: 22 },
      { frequency: 'Bi-weekly', percentage: 12 },
      { frequency: 'Monthly', percentage: 6 },
    ],
    preferredChannels: [
      { channel: 'Supermarkets', percentage: 45 },
      { channel: 'Online Delivery', percentage: 32 },
      { channel: 'Specialty Stores', percentage: 18 },
      { channel: 'Farmers Markets', percentage: 5 },
    ],
    topConcerns: [
      { concern: 'Price', percentage: 58 },
      { concern: 'Taste Quality', percentage: 52 },
      { concern: 'Nutritional Value', percentage: 48 },
      { concern: 'Availability', percentage: 42 },
      { concern: 'Ingredient Transparency', percentage: 38 },
    ],
  }
}

exports.generateMarketMetrics = () => {
  return {
    totalMarketSize: 125000000,
    growthRate: 18.5,
    activeConsumers: 45000000,
    marketPenetration: 12.3,
    topProduct: 'Plant-Based Milk',
    fastestGrowing: 'Plant-Based Meat',
    regionalLeader: 'Asia Pacific',
  }
}

exports.generateTimeSeriesData = (days = 30) => {
  const data = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    data.push({
      date: date.toISOString().split('T')[0],
      demand: Math.floor(Math.random() * 5000) + 20000 + (i * 100),
      supply: Math.floor(Math.random() * 5000) + 18000 + (i * 90),
      price: (Math.random() * 2 + 8).toFixed(2),
    })
  }

  return data
}

