const webpack = require('webpack');

const loaders = {
    jsxLoader: {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["env", "react"]
        }
    },
    fileLoader: {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png)$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]',
    },
    scssLoader: {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader',
    },
    cssLoader: {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader',
    },
    jsonLoader: {
        test: /\.json$/,
        loader: 'json-loader'
    },
};
const app = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    module: {
        loaders: [
            loaders.jsxLoader,
            loaders.fileLoader,
            loaders.scssLoader,
            loaders.cssLoader,
            loaders.jsonLoader,
        ]
    },
};
module.exports = [
    app
]

    // plugins:[
    //   new webpack.DefinePlugin({
    //     'process.env':{
    //       'NODE_ENV': JSON.stringify('production')
    //     }
    //   }),
    // ]
