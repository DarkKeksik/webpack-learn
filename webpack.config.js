const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// При продакшен сборке добавляем оптимизацию проэкта
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}


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

// optimization - настройка оптимизации
// splitChunks - Позволяет вынести код подключаемый
// в нескольких файлах, в 1 и использовать его

// CopyWebpackPlugin - под файлы, которые должны быть в проекте принудительно (например favicon)

// MiniCssExtractPlugin - Для того чтобы стили были в отдельном файле, а не в <head />

// isDev - Проверяет системную переменную в каком mode был запущен webpack
// и в зависимости от этого задает параметры для конфига (mini-css-extract-plugin и devServer)

// cross-env дает возможность кроссплатформенно задавать сис. переменные

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.js",
        analytics: "./analytics.js"
    },
    output: {
        filename: "[name].[hash].js",
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
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                },
                "css-loader",
                "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, "src/favicon.ico"), to: path.resolve(__dirname, "dist") }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        })
    ],
    devServer: {
        port: 8080,
        hot: isDev
    },
    optimization: optimization()
}