const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 配置處理 .md 文件為原始文本
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .type('asset/source')
    
    // 配置處理 .pdf 文件
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .type('asset/resource')
  }
})
