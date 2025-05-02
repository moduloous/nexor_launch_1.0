module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@screens': './app/screens',
            '@navigation': './app/navigation',
            '@types': './app/types',
            '@data': './app/data'
          }
        }
      ]
    ]
  };
}; 