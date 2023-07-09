const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const MinifyPlugin = require("babel-minify-webpack-plugin");

const getEntry = buildTarget => {
  let entry;

  if (buildTarget === 'client'){

    entry = ['./app/index.js'];

    if (isDev) entry.unshift('webpack-hot-middleware/client?reload=true');

  } else if (buildTarget === 'server') {

    entry = ['./api/index.js'];

    if (isDev) entry = ['./app/serverMiddleware.js'];

  } else {

    throw new Error('No valid target specified for build');

  }

  return entry;
};

const clientConfig = {
  name: 'client',
  entry: getEntry('client'),
  mode: nodeEnv,
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    filename: 'app.js',
    publicPath: '/assets'
  },
  optimization: {
    minimizer: [
      ...isDev
      ? []
      : [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            compress: true,
            ecma: 6,
            mangle: true
          }
        })
      ]
    ]
  },
  plugins: [
    ...isDev
      ? [
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin()
    ]
    : [
      // new BundleAnalyzerPlugin(),
      // new CleanWebpackPlugin(['dist/client/*']),
      new webpack.optimize.OccurrenceOrderPlugin(),
      // new PurifyCSSPlugin({
      //   paths: glob.sync(path.join(__dirname, 'app/views/**/*.js')),
      //   purifyOptions: { info: true, minify: false }
      // }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /style\.css$/,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        }
      }),
      new CompressionPlugin()
    ],
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([{
      from: './node_modules/material-design-icons/iconfont/*.woff2',
      to: './[name].[ext]'
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new MiniCssExtractPlugin({
      filename: './style.css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        ...isDev ? ['css-hot-loader'] : [],
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.js$/,
      ...isDev ? { exclude: /node_modules/ } : {},
      loader: 'babel-loader',
      options: {
        babelrc: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                ie: 11,
                edge: 14,
                firefox: 45,
                chrome: 49,
                safari: 10,
              }
            }
          ],
        ],
        plugins: isDev ? ['react-hot-loader/babel'] : []
      }
    }]
  },
  devtool: 'source-map'
};

const serverConfig = {
  name: 'server',
  entry: getEntry('server'),
  target: 'node',
  mode: nodeEnv,
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'api.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    ...isDev ? [ new FriendlyErrorsWebpackPlugin() ] : [],
    new CleanWebpackPlugin(['dist/*']),
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'ignore-loader',
      ],
    }, {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      babelrc: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: 'current'
            }
          }
        ],
      ]
    },
  }]
  },
  devtool: 'source-map'
};

module.exports = isDev ? [clientConfig, serverConfig] : [clientConfig];
