module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '#components': './components',
            '#constants': './constants',
            '#hooks': './hooks',
            '#screens': './screens',
            '#types': './types',
          },
        },
      ],

      require.resolve('expo-router/babel'),
    ],
  };
};
