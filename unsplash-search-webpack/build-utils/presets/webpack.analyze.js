const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = () => {
  return {
    plugins: [ new WebpackBundleAnalyzer() ],
  }
}