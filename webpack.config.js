const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// При продакшен сборке добавляем оптимизацию проекта
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

// Функция, которая добавляет hash при продакшен сборке
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

// DRY
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        "css-loader"
    ]

    if ( extra ) {
        loaders.push( extra );
    }

    return loaders;
}

// DRY
const babelLoader = preset => {
    let config = {
        loader: "babel-loader",
        options: {
            presets: [ "@babel/preset-env" ]
        }
    }

    if ( preset ) {
        config.options.presets.push( preset );
    }

    return config;
}

const plugins = () => {
    const base = [
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
            filename: filename("css")
        })
    ];

    if (isProd) {
        base.push( new BundleAnalyzerPlugin() );
    }

    return base;
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

// devtool - поле позволяющее добавить просмотр исходников проекта в консоли разработчика
module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"],
        analytics: "./analytics.js"
    },
    output: {
        filename: filename("js"),
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
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader")
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: babelLoader()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: babelLoader("@babel/preset-typescript")
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: babelLoader("@babel/preset-react")
            }
        ]
    },
    plugins: plugins(),
    devServer: {
        port: 8080,
        hot: isDev
    },
    optimization: optimization(),
    devtool: isDev ? "source-map" : ""
}
