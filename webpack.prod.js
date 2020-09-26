const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
    mode:'production',
    optimization:{
        minimize:true,
        // minimizer:[new OptimizeCssAssetsPlugin()]
        minimizer:[new OptimizeCssAssetsPlugin(),new TerserPlugin()]
    },
    output:{
        filename:'main.[contentHash].js'
    },
    module:{
        rules:[
            
            {
                test:/\.css$/,
                exclude:/style\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/style\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.html$/,
                loader:'html-loader',
                options:{
                    attributes:false,
                    minimize:false //minimizar el codigo html
                },
            },
            {
                test:/\.(png|svg|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: ["babel-loader"]
            },
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'./src/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[contentHash].css',
            ignoreOrder:false
        }),
        new CopyPlugin({
            patterns:[
                {from:'src/assets',to:'assets/'}
            ]
        }),
        new CleanWebpackPlugin(),
    ]
}