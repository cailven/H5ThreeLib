/**
 * Created by caivlen.zhang on 2017/2/22.
 */
const path = require('path');
const webpack = require('webpack');
// console.log(path.resolve());
const config = {
    mode: 'development',
    // mode:"production",
    entry: './web/tsSrc/Main.ts',
    output: {
        path: path.resolve(__dirname, "dist/impublic/js/app/"),
        filename: "[name].js",
        chunkFilename: "chunck/[name].js",
        publicPath: "./impublic/js/app/", // string
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: [".tsx", ".ts", '.es6', ".js", ".json", ".jsx", ".css"],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // img: path.join(__dirname, './web/public/zsm/img/'),
            // web: path.join(__dirname, "./web/public"),
        },
        modules: [
            path.resolve(__dirname, "src")
        ],
    },

    module: {
        rules: [
            {
                test: /\.(es6)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015',
                /*options: {
                 'presets': ['es2015'],
                 }*/
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',

            },
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.(png|jpg|gif|mp3)$/, loader: 'url-loader?limit=2024000000'},
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            // {test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/},
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({ sourceMap: true, warnings: true, minimize: true}),
    ]
};

module.exports = config;