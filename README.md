# webpack-learn #
## Поддержка webpack функционала: 🎁
1) Генерация имени с хешем в production сборке
2) Сборка нескольких .js файлов через расширение параметра entry *(передача объекта с списком всех скриптов)
3) Формирование конечного билда в папке **dist**
4) Добавление контекта *(основной папки с исходниками через параметр **context**)
5) Изначальная сборка с модом development *(параметр mode меняется при запуске команды из package.json)
```
// Пример:
  npm run dev -> Запустит webpack и передаст в него --mode development
  npm run build -> --mode production
```
6) При запуске npm скрипта меняется системная переменная NODE_ENV *(переменная позволяет определить в каком моде была запущенна сборка чтобы сделать **минификацию, добавление хешей к названию файлов, задать параметр devtool(source-map) и т.д**
7) Работа с путями проекта
* Добавление extention - для возможности пропуска расширения в наименовании файла при его вызове **(js, json)**
* Добавление alias - для сокращения путей при обращении к 'глубоким директориям'
```
// Пример:
alias: {
  "@deepFolder": path.resolve(__dirname, "src/deep/deep/deepFolder")
}
```
8) Добавление loaders для работы с файлами типа: 
8.1) .css, .less, .sass --> *CSS*
8.2) .png, .svg, .jpg, .gif --> *Изображения*
8.3) .ttf, .woff, .woff2, .eot --> *Шрифты*
8.4) .mjs, js, ts --> *JS, TypeScript*
8.5) .jsx --> *React*
9) Сервер разработки на порту **8080**(*devServer*) с обновлением контента без обновления страницы (**hot**)
10) Транспиляция js (*Babel и пресеты*):
10.1) @babel/preset-env --> core
10.2) @babel/preset-react
10.3) @babel/preset-typescript
11) Плагин, которые добавляется, только при production сборке **BundleAnalyzerPlugin** - который позволяет увидеть на графике, размер каждого модуляя в сборке
