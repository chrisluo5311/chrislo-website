const path = require('path');
const dotenv = require('dotenv');

const DEV = dotenv.config({ path: path.resolve(__dirname, 'env/development.env') }).parsed || {};
const PROD = dotenv.config({ path: path.resolve(__dirname, 'env/production.env') }).parsed || {};

module.exports = {
  apps: [
    /**
     * DEV 模式：Vue CLI 開發伺服器
     * - 用 pm2 來守護 dev server（可熱重載、看 log、不會因 SSH 結束而關）
     * - 可用 `--env development` 啟動
     */
    {
      name: 'chrislo-web-dev',
      script: './node_modules/.bin/vue-cli-service',
      args: 'serve',
      env: {
        ...DEV,
        HOST: '0.0.0.0',    // 對外可訪問
      },
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      // 選配：你想集中 log
      error_file: './logs/dev.err.log',
      out_file: './logs/dev.out.log',
    },

    /**
     * PROD 模式：靜態檔案服務 dist/
     */
    {
      name: 'chrislo-web',
      script: './node_modules/.bin/serve',
      args: ['-s', 'dist', '-l', PROD.PORT || '8080'],
      env: {
        ...PROD,
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