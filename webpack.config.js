const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// [name] - имя чанков из entry
// [contenthash] - хеш от контента файла (решить проблему с кешированием)

// Плагины задаются через new
// html-webpack-plugin - для взаимодействия с html
// clean-webpack-plugin - для отчистки папки с сборкой

// Loaders - Позволяют работать с файлами отличающиемся от js
// обрабатываются справа -> налево
// file-loader - под обработку картинок и других типов файлов

// resolve -> extensions ( Позволяет не указывать расширения файлов )
// resolve -> alias ( Шаблоны для путей )

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.js",
        analytics: "./analytics.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            "@deepFolder": path.resolve(__dirname, "src/deep/deep/deepFolder"),
            "@": path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin()
    ]
}