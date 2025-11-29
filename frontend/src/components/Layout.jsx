import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ForecastIcon from '@mui/icons-material/ShowChart'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import InsightsIcon from '@mui/icons-material/Insights'
import NatureIcon from '@mui/icons-material/Nature'

const drawerWidth = 280

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Regional Trends', icon: <TrendingUpIcon />, path: '/regional-trends' },
  { text: 'Demand Forecast', icon: <ForecastIcon />, path: '/demand-forecast' },
  { text: 'Cultivation Areas', icon: <LocationOnIcon />, path: '/cultivation-areas' },
  { text: 'Consumer Insights', icon: <InsightsIcon />, path: '/consumer-insights' },
]

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#ffffff' }}>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <NatureIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Vegan Analytics
          </Typography>
          <Typography variant="caption" color="text.secondary">
            AI-Driven Insights
          </Typography>
        </Box>
      </Box>
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path)
                  if (isMobile) setMobileOpen(false)
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.light' : 'transparent',
                  color: isActive ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.main' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'white' : 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ p: 3, mt: 'auto', borderTop: '1px solid #e0e0e0' }}>
        <Chip
          label="Beta Version"
          color="primary"
          size="small"
          sx={{ width: '100%', fontWeight: 600 }}
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <Chip
            icon={<NatureIcon />}
            label="Sustainable Analytics"
            color="primary"
            variant="outlined"
            size="small"
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout

