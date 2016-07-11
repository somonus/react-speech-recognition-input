var webpack = require("webpack");

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: './bin',
        filename: 'index.js',
    },
    externals: {
        react: 'react'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=1' }
        ]
    }
}
