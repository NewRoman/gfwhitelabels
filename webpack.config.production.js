var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    path = require('path'),
    cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.pug', '.sass', '.scss'],
        modulesDirectories: [
            './',
            'js',
            'src',
            'node_modules'
        ]
    },

    debug: false,

    plugins: [
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            title: 'Backbone App',
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body' // Inject all scripts into the body
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Backbone: "backbone"
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false
            },
            output: {comments: false}
        }),
        new cleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],

    module: {
        loaders: [
            {test: /bootstrap\/js\//, loader: 'imports?jQuery=$' },
            {test: /\.html?$/, loader: 'file?name=[name].[ext]'},
            {test: /\.pug$/, loader: 'pug-loader'},
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']}},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
            {test: /\.jpe?g$/, loader: 'url?limit=8192&mimetype=image/jpg'},
            {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=image/svg+xml'},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff2'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/octet-stream'},
            {test: /\.md$/, loaders: ['html', 'markdown']}
        ]
    }
};
