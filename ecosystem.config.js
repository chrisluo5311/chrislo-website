module.exports = {
  apps: [
    // prod
    {
      name: 'chrislo-web',
      script: './node_modules/.bin/serve',
      args: ['-s', 'dist', '-l', 'tcp://127.0.0.1:8080'],
      env: {
        NODE_ENV: 'production',
      },
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      error_file: './logs/prod.err.log',
      out_file: './logs/prod.out.log',
    }
  ]
};