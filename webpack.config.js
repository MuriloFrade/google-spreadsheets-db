
const path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/google-spreadsheet-db.js',
  output: {
    filename: 'google-spreadsheet-db.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GoogleSpreadsheetDb',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
