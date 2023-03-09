const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => ({
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        background: path.resolve(__dirname, './src/background.js'),
        popup: path.resolve(__dirname, './src/popup.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'popup.html'),
            filename: 'popup.html',
            chunks: ['popup'],
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets/icon128.png',
                    to: path.join(__dirname, 'dist'),
                    force: true,
                },
                {
                    from: 'src/assets/logo.png',
                    to: path.join(__dirname, 'dist'),
                    force: true,
                },
            ],
        }),
        new Dotenv({
            path: './.env.dev',
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: 'manifest.json' },
            ],
        }),
        new ESLintPlugin(),
    ],
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
});
