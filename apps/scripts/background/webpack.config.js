module.exports = (baseConfig) => {
  baseConfig.optimization.runtimeChunk = false;

  return baseConfig;
};
