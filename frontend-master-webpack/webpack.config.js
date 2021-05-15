const webpack           =                     require("webpack")
const webpackMerge      =                     require('webpack-merge')
const HtmlWebpackPlugin =                     require('html-webpack-plugin')
const modeConfig        = env => require(`./build-utils/webpack.${env}`)(env)
const presetConfig      = require('./build-utils/loadPresets')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 5000,
                },
              }
            ],
          }
        ],
      },
      output: {
        filename: 'bundle.js',
        chunkFilename: "[name].lazy-chunk.js",
      },
      devtool: "source-map",
      plugins: [ new HtmlWebpackPlugin(), new webpack.ProgressPlugin() ],
    },
    modeConfig(mode),
    presetConfig({ mode, presets }),
  )
}