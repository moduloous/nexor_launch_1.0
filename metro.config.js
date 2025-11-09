const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  // Enhanced asset handling
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  };
  
  config.resolver = {
    ...resolver,
    assetExts: [...resolver.assetExts.filter((ext) => ext !== 'svg'), 'png', 'jpg', 'jpeg', 'gif'],
    sourceExts: [...resolver.sourceExts, 'svg'],
    // Exclude Node.js modules that Supabase tries to use
    resolveRequest: (context, moduleName, platform) => {
      // Exclude ws (WebSocket) and Node.js built-in modules
      if (
        moduleName === 'ws' ||
        moduleName === 'http' ||
        moduleName === 'https' ||
        moduleName === 'net' ||
        moduleName === 'tls' ||
        moduleName === 'crypto'
      ) {
        return {
          type: 'empty',
        };
      }
      // Let Metro handle other modules
      return context.resolveRequest(context, moduleName, platform);
    },
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
    }),
  };

  return config;
})(); 