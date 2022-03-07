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
            /**
             * any part of the i18next or react-i18next lib can be shared
             * WHY?
             * Because if we shared the react-i18next the instance created on the MF is not
             * respecting the parent instance and overriding
             */
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
                }
            }
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html'
        })
    ]
}