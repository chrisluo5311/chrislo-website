module.exports = {
  apps: [
    /**
     * DEV 模式
     */
    {
      name: 'chrislo-web-dev',
      script: './node_modules/.bin/vue-cli-service',
      args: 'serve',
      env: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0',    // 對外可訪問
      },
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      error_file: './logs/dev.err.log',
      out_file: './logs/dev.out.log',
    },

    /**
     * PROD 模式：靜態檔案服務 dist/
     */
    {
      name: 'chrislo-web',
      script: './node_modules/.bin/serve',
      args: ['-s', 'dist', '-l', '8080'],
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
      },
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      error_file: './logs/prod.err.log',
      out_file: './logs/prod.out.log',
    }
  ]
};