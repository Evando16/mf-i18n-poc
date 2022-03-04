const HtmlWebPackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container

const pkjson = require('./package.json')

module.exports = {
    entry: './src',
    output: {
        publicPath: 'auto'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false
                    }
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            library: { type: 'var', name: 'home' },
            filename: 'remoteEntry.js',
            remotes: {
                nav: 'nav'
            },
            exposes: {
                './constant': './src/constant'
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                    requiredVersion: pkjson.dependencies.react
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: pkjson.dependencies['react-dom']
                },
                'react-i18next': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: pkjson.dependencies['react-i18next']
                }
            }
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html'
        })
    ]
}