const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';
// console.log(process.cwd(),path.resolve(process.cwd(),'src/assets/constants.scss'));

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/main.js',
        mode: 'production',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack', 'url-loader'],
                },
                {
                    test: /\.(gif|png|jpg)(\?.*$|$)/,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                          limit: 8192,
                          name: '[name].[ext]',
                          publicPath: 'images/'
                        },
                      },
                    ],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      "style-loader",
                      // Translates CSS into CommonJS
                      "css-loader",
                    ],  
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      "style-loader",
                      // Translates CSS into CommonJS
                      "css-loader",

                      {
                          loader: 'sass-loader',
                          options: {
                            implementation: require('sass'),
                            // additionalData: `@import '${path.resolve(process.cwd(),'src/assets/styles/constants.scss')}';`,
                            // includePaths:[__dirname, 'src']
                          }
                      }
                    ],
                  },
            ],
        },
        devServer: {
            contentBase: bundleOutputDir,
            open: {
                app: {
                    name: 'google chrome',
                },
            }
        },
        plugins: [
            new copyWebpackPlugin([{ from: 'demo/' }]),
        ]
    }];
};