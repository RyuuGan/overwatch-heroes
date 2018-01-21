'use strict';

// Helper: root() is defined at the bottom
const path = require('path');
const webpack = require('webpack');

// Webpack Plugins
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

  const config = {};

  config.devtool = 'source-map';

  config.entry = {
    'polyfills': './client/src/polyfills.ts',
    'vendor': './client/src/vendor.ts',
    'app': './client/src/main.ts' // our angular app
  };

  config.output = {
    path: root('client/dist'),
    publicPath: isProd ? '/' : '/',
    filename: isProd ? 'public/js/[name].[hash].js' : 'public/js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  };

  config.module = {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
          .concat(isProd ? [] : '@angularclass/hmr-loader'),
        exclude: [/node_modules\/(?!(ng2-.+))/]
      },
      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Support for *.json files.
      { test: /\.json$/, loader: 'json-loader' },

      {
        test: /\.css$/,
        exclude: root('./client/src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },

      {
        test: /\.(scss|sass)$/,
        exclude: root('./client/src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },


      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      { test: /\.html$/, loader: 'raw-loader', exclude: root('./client/src', 'assets') }
    ]
  };

  config.plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV),
        apiHost: isProd ? '"dojo-madness-challenge.herokuapp.com"' : '"127.0.0.1:3001"',
        host: isProd ? '"dojo-madness-challenge.herokuapp.com"' : '"127.0.0.1:3000"',
        secured: isProd ? true : false
      }
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./client/src') // location of your src
    ),

    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        /**
         * Sass
         * Reference: https://github.com/jtangelder/sass-loader
         * Transforms .scss files to .css
         */
        sassLoader: {
          //includePaths: []
        },
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({
      template: root('./client/src/assets/index.html'),
      chunksSortMode: 'dependency'
    }),

    new ExtractTextPlugin({
      filename: 'public/css/[name].[hash].css',
      disable: !isProd
    })
  ].concat(isProd ? [] : new webpack.HotModuleReplacementPlugin());

  if (!isProd) {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),

      // To speed up CommonsChunkPlugin
      new ChunkManifestPlugin({
        filename: 'manifest.json',
        manifestVariable: 'webpackManifest',
        inlineManifest: false
      })
    );
  }


  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: { keep_fnames: true }
      }),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: root('client/src/assets'),
        to: root('client/dist')
      }])
    );
  }

  config.devServer = {
    contentBase: './client/src/assets',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
