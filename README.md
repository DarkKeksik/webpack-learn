# Тестовый webpack проэкт #
## Функционал проекта: 🎁
1. CSS стили добавляются в .css файл вместо тега <style /> (*Плагин MiniCssExtractPlugin*)
1. Новый билд перезатирает старый (* Плагин CleanWebpackPlugin *)
1. Генерация имени с хешем в production сборке
1. Сборка нескольких .js файлов через расширение параметра entry *(передача объекта с списком всех скриптов)
1. Формирование конечного билда в папке **dist**
1. Добавление контекта *(основной папки с исходниками через параметр **context**)
1. Изначальная сборка с модом development (параметр mode меняется при запуске команды из package.json)
   ```
   // Пример:
      npm run dev -> Запустит webpack и передаст в него --mode development
      npm run build -> --mode production
    ```
_____
  
  
1. При запуске npm скрипта меняется системная переменная NODE_ENV *(переменная позволяет определить в каком моде была запущенна сборка чтобы сделать **минификацию, добавление хешей к названию файлов, задать параметр devtool(source-map) и т.д**
1. Работа с путями проекта
   1. Добавление extention - для возможности пропуска расширения в наименовании файла при его вызове **(js, json)**
   1. Добавление alias - для сокращения путей при обращении к 'глубоким директориям'
   ```javascript
   // Пример:
    alias: {
      "@deepFolder": path.resolve(__dirname, "src/deep/deep/deepFolder")
    }
   ```
  _____
  
  
1. Добавление loaders для работы с файлами типа:
   1. .css, .less, .sass --> *CSS*
   1. .png, .svg, .jpg, .gif --> *Изображения*
   1. .ttf, .woff, .woff2, .eot --> *Шрифты*
   1. .mjs, js, ts --> *JS, TypeScript*
   1. .jsx --> *React*

1. Сервер разработки на порту **8080**(*devServer*) с обновлением контента без обновления страницы (**hot**)
1. Транспиляция js (*Babel и пресеты*):
   1. @babel/preset-env --> core
   1. @babel/preset-react
   1. @babel/preset-typescript
1. Плагин, которые добавляется, только при production сборке **BundleAnalyzerPlugin** - который позволяет увидеть на графике, размер каждого модуляя в сборке
