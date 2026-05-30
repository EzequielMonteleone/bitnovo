module.exports = function (api) {
  const isTest = api.env('test');

  return {
    presets: ['babel-preset-expo'],
    plugins: isTest
      ? []
      : [
          [
            'module:react-native-dotenv',
            {
              moduleName: '@env',
              path: '.env',
              safe: false,
              allowUndefined: true,
            },
          ],
        ],
  };
};
