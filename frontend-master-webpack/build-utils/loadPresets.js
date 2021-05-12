const webpackMerge = require('webpack-merge')

const applyPresets = env => {
  const { presets } = env
  /** @type {string[]} */
  const mergedPreset = [].concat(...[presets])
  const mergedConfigs = mergedPreset.map(
    presetName => require(`./presets/webpack.${presetName}`)(env)
  )
  return webpackMerge({}, ...mergedConfigs)
}

module.exports = applyPresets