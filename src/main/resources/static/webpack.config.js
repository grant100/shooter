const path = require('path');

module.exports = {
    entry: './web-src/app.module.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('build')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
           /* {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            },*/
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    },


};