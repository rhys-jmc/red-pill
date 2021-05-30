module.exports = function (api) {
  // eslint-disable-next-line functional/no-expression-statement
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
