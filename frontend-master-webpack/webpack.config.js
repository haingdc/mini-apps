const webpack           =                     require("webpack")
const webpackMerge      =                     require('webpack-merge')
const HtmlWebpackPlugin =                     require('html-webpack-plugin')
const modeConfig        = env => require(`./build-utils/webpack.${env}`)(env)
console.log({modeConfig })

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      mode,
      output: {
        filename: 'bundle.js',
      },
      devtool: "source-map",
      plugins: [ new HtmlWebpackPlugin(), new webpack.ProgressPlugin() ],
    },
    modeConfig(mode)
  )
}