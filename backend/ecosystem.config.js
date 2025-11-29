// PM2 ecosystem file for production deployment
// Install PM2: npm install -g pm2
// Start: pm2 start ecosystem.config.js
// Save: pm2 save
// Startup: pm2 startup

module.exports = {
  apps: [{
    name: 'vegan-market-backend',
    script: './server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}

