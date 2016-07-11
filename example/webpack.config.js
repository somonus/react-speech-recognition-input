var path = require("path");
module.exports = {
  entry: {
    app: path.join(__dirname, './app')
  },
  output: {
    path: path.join(__dirname, 'debug'),
    publicPath: "/",
    filename: "index.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  }
};
