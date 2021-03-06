const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => ({
  output: {
    filename: 'bunddle.js'
  },
  devtool: "none",
  module: {
    rules: [
      {
        test: /\.css/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});