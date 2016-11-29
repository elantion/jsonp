const webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');

let files = fs.readdirSync('./asset/js/entry/');
let plugins = [];
let entryNames = files.map(function (file) {
    return file.replace(/.jsx?$/, '');
});

// plugins.push(
//     new webpack.DefinePlugin({
//         "process.env": {
//             NODE_ENV: JSON.stringify("production")
//         }
//     })
// );

plugins.push(new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true,
    sourceMap: false
}));

let loaders = [];
loaders.push({
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    cacheDirectory: true,
    query: {
        presets: ['es2015', 'stage-0']
    }
});
loaders.push({ test: /\.scss$/, loader: ExtractTextPlugin.extract(
    'style',
    'css!resolve-url!postcss!sass'
)});
loaders.push({test: /\.css/, loader: 'file?name=css/[name].css'});
let entry = {};
entryNames.forEach(function (entryName) {
    entry[entryName] = './asset/js/entry/' + entryName + '.js';
    entry[entryName + '.min'] = './asset/js/entry/' + entryName + '.js';
});
entry['js/test'] = './test/js/test.js';
module.exports = {
    entry: entry,
    output: {
        library: 'jsonp',
        libraryTarget: "umd",
        path: "dist",
        publicPath: "",
        filename: '[name].js'
    },
    module: {
        loaders: loaders
    },
    plugins: plugins
};
