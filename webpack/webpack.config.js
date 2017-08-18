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
  }
};
