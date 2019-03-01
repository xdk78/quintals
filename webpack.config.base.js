const { resolve, join } = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      }
    ]
  },

  node: {
    __dirname: false,
    __filename: false
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}
