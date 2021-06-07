/* jslint ignore:start */
const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const modernConfig = (env, argv) => {
  const devMode = argv.mode !== 'production';
  const purgeCss = false;

  const outputPath = path.resolve(__dirname, 'public/assets/generated') // path.resolve(__dirname, 'docs/assets/generated');

  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
      chunkFilename: 'css/[name].min.css',
    }),
  ];

  if (purgeCss) {
    plugins.push(
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, 'public/**/*.html')}`, { nodir: true }),
        safelist: {
          standard: [
            'modal-backdrop',
            'page-footer-push',
            'show',
          ],
          deep: [
            /^pswp-/,
            /^pswp_/,
            /^is-scrolled$/,
          ],
        },
      }),
    );
  }

  if (env.stats) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: './resources/assets/main.js',
    stats: 'errors-warnings',
    devtool: devMode ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            {
              loader: 'css-loader',
              options: {
                url: (url) => !/^..\//.test(url),
                sourceMap: devMode,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img/',
              },
            },
          ],
        },
      ],
    },
    output: {
      path: outputPath,
      filename: 'js/[name].min.js',
      clean: true,
      globalObject: 'this',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendorJs: {
            name: 'vendor',
            chunks: 'initial',
            // Note the usage of `[\\/]` as a path separator for cross-platform compatibility.
            test: /[\\/]node_modules[\\/]/,
          },
          vendorStyles: {
            name: 'vendor',
            test: /vendor\.scss$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    plugins,
  };
};


module.exports = [modernConfig];
/* jshint ignore:end */
