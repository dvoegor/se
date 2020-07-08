const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: './bin/www',
    output: {
        path: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new MinifyPlugin({}, {
            comments: false
        })
    ]
}
