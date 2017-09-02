const webpack = require('webpack')

// Settings from environment:
// All build-time env variables prefixed with 'WPK__' will be available
// in process.env in the bundled code, without the prefix.

const envPrefix = 'WPK__'
const environment = Object.keys(process.env)
  .filter(env => env.indexOf(envPrefix) === 0)
  .reduce(
    (aggr, env) => Object.assign(
      aggr,
      { [env.replace(envPrefix, '')]: JSON.stringify(process.env[env]) }
    ),
    { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
  )

let plugins = [
  new webpack.DefinePlugin({
    'process.env': environment
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: "./src/index.js",
  output: {
      path: '/usr/src/app/bundle/',
      filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: plugins,
};
