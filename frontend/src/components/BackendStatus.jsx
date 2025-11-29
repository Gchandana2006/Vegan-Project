import React, { useEffect, useState } from 'react'
import { Alert, Box, Chip } from '@mui/material'
import { checkAPIHealth } from '../services/api'

function BackendStatus() {
  const [status, setStatus] = useState('checking')
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await checkAPIHealth()
        setStatus('connected')
        setError(null)
      } catch (err) {
        setStatus('disconnected')
        setError(err.message)
      }
    }

    checkBackend()
    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000)
    return () => clearInterval(interval)
  }, [])

  if (status === 'checking') {
    return null
  }

  if (status === 'disconnected') {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="warning" sx={{ mb: 1 }}>
          <strong>Backend Server Not Connected</strong>
          <br />
          {error || 'Please make sure the backend server is running on http://localhost:5000'}
          <br />
          <small>Run: <code>cd backend && npm run dev</code></small>
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Chip
        label="Backend Connected"
        color="success"
        size="small"
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      />
    </Box>
  )
}

export default BackendStatus

