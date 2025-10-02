const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 讓圖片一律輸出成檔案，不做 base64 inline
    const imagesRule = config.module.rule('images');
    imagesRule.uses.clear();
    imagesRule
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'img/[name].[hash:8].[ext]' });
  },
  publicPath: '/'
})
