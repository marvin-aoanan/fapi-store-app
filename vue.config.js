const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});
module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        // Add polyfills for the missing modules
        //http: require.resolve('stream-http'),
        // https: require.resolve('https-browserify'),
        // stream: require.resolve('stream-browserify'),
        // util: require.resolve('util/'),
        // zlib: require.resolve('browserify-zlib'),
        // url: require.resolve('url/'),
        // assert: require.resolve('assert/'),
      },
    },
  },
};

