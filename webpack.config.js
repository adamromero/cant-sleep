var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
    	rules: [{
    		test: /\.scss$/, 
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader','sass-loader'],
                publicPath: '/dist'
            })
    	},
    	{ 
    		test: /\.js?$/,
            exclude: /(node_modules)/,
    		loader: 'babel-loader',
    		query: {presets:['react', 'es2015']}
    	}]
    },
    plugins: [
      	new ExtractTextPlugin({
      		filename: 'bundle.css',
      		allChunks: true,
      	}),
    ]
};