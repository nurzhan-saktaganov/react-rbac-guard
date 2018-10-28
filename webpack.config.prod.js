'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    externals: [
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            },
        },
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
        },
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'node_modules',
            path.join(__dirname, 'src'),
        ],
    },
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        library: 'react-rbac-guard',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'lib'),
        umdNamedDefine: true,
    },
    module: {
        rules: 
        [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
            },
        ],
    },
};
