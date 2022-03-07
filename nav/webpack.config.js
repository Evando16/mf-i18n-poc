const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container

const pkjson = require('./package.json')

module.exports = {
    entry: './src',
    output: {
        publicPath: 'auto'
    },
    // output: {
    //     publicPath: '/',
    //     path: path.resolve(__dirname, '../../dist'),
    //     filename: '[name].[fullhash].js',
    //     chunkFilename: '[chunkhash].bundle.js'
    // },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    devServer: {
        port: 8081
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
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[contenthash].[ext]'
                }
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            titleProp: true,
                            ref: true
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[contenthash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'nav',
            library: { type: 'var', name: 'nav' },
            filename: 'remoteEntry.js',
            remotes: {
                home: 'home'
            },
            exposes: {
                './Header': './src/header',
                './Footer': './src/footer',
                './translation': './src/translation.ts'
            },
            shared: {
                react: {
                    singleton: true,
                    strictVersion: true,
                    eager: true,
                    requiredVersion: pkjson.dependencies.react
                },
                'react-dom': {
                    singleton: true,
                    strictVersion: true,
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