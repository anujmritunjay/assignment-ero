module.exports = {
    apps: [{
      name: 'easy-erp-solutions',
      script: './dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
};