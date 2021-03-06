
// @ts-nocheck
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// ----------------------
// IMPORTS

/* NPM */

// Show a nice little progress bar (for Webpack)
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

// Chalk library, for adding color to console messages
import chalk from 'chalk';

// ----------------------

export const css = {
  // CSS loader configuration -- plain CSS, SASS and LESS
  loaders: [
    {
      ext: 'css',
      use: [],
    },
    {
      ext: 's(c|a)ss',
      use: ['resolve-url-loader', 'sass-loader?sourceMap'],
    },
    {
      ext: 'less',
      use: ['less-loader'],
    },
  ],

  // Defaults to use with `css-loader` in all environments
  loaderDefaults: {
    // No need to minimize-- CSSNano already did it for us
    minimize: false,

    // Format for 'localised' CSS modules
    localIdentName: '[local]-[hash:base64]',

    // Retain the loader pipeline
    importLoaders: 1,
  },

  // Return an array containing the module RegExp and css-loader config,
  // based on the original file extension
  getModuleRegExp(ext) {
    return [
      [`[^\\.global]\\.${ext}$`, { modules: true }],
      [`\\.global\\.${ext}$`, { modules: false }],
    ];
  },

  getDevLoaders() {
    return (function* loadCss() {
      for (const loader of css.loaders) {
        // Iterate over CSS/SASS/LESS and yield local and global mod configs
        for (const mod of css.getModuleRegExp(loader.ext)) {
          yield {
            test: new RegExp(mod[0]),
            loader: [
              'style-loader',
              {
                loader: 'css-loader',
                query: Object.assign({}, css.loaderDefaults, {
                  // Use sourcemaps in development
                  sourceMap: true,
                }, mod[1]),
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                },
              },
              ...loader.use,
            ],
          };
        }
      }
    }());
  },

  getExtractCSSLoaders(extractCSS, sourceMap = false) {
    return (function* loadCss() {
      for (const loader of css.loaders) {
        // Iterate over CSS/SASS/LESS and yield local and global mod configs
        for (const mod of css.getModuleRegExp(loader.ext)) {
          yield {
            test: new RegExp(mod[0]),
            loader: extractCSS.extract({
              use: [
                {
                  loader: 'css-loader',
                  query: Object.assign({}, css.loaderDefaults, {
                    sourceMap,
                  }, mod[1]),
                },
                // Temp fix for `postcss-loader` bug https://github.com/postcss/postcss-loader/issues/250
                sourceMap ? {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                  },
                } : 'postcss-loader',
                ...loader.use,
              ],
              fallback: 'style-loader',
            }),
          };
        }
      }
    }());
  },
};

// Production config
export const stats = {
  // Add asset Information
  assets: true,
  // Sort assets by a field
  assetsSort: 'field',
  // Add information about cached (not built) modules
  cached: false,
  // Show cached assets (setting this to `false` only shows emitted files)
  cachedAssets: false,
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  // Add the origins of chunks and chunk merging info
  chunkOrigins: false,
  // Sort the chunks by a field
  chunksSort: 'field',
  // `webpack --colors` equivalent
  colors: true,
  // Display the distance from the entry point for each module
  depth: false,
  // Display the entry points with the corresponding bundles
  entrypoints: false,
  // Add errors
  errors: true,
  // Add details to errors (like resolving log)
  errorDetails: true,
  // Exclude modules which match one of the given strings or regular expressions
  exclude: [],
  // Add the hash of the compilation
  hash: true,
  // Set the maximum number of modules to be shown
  maxModules: 15,
  // Add built modules information
  modules: false,
  // Sort the modules by a field
  modulesSort: 'field',
  // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
  moduleTrace: false,
  // Show performance hint when file size exceeds `performance.maxAssetSize`
  performance: true,
  // Show the exports of the modules
  providedExports: false,
  // Add public path information
  publicPath: false,
  // Add information about the reasons why modules are included
  reasons: false,
  // Add timing information
  timings: true,
  // Show which exports of a module are used
  usedExports: false,
  // Add webpack version information
  version: false,
  // Add warnings
  warnings: true,
};

// Return a new Webpack plugin that shows a progress bar of what is being
// built, and a 0-100% indicator of the Webpack build status
export function webpackProgress(what = chalk.magenta.bold('ReactQL')) {
  return new ProgressBarPlugin({
    format: `${what} building [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
  });
}
