const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[contenthash:8].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src.html',
        filename: 'index.html',
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeLinkTags: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash:8].css'
    }),
    new JavaScriptObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.75,
      reservedStrings: ['\s*']
    }, [])
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
};