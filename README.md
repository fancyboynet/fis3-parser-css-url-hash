# fis3-parse-css-url-hash

css引用本地图片链接自动增加hash query,避免浏览器缓存

## 安装

```bash
$ npm install fis3-parse-css-url-hash --save-dev
```

## 基本使用

```js
fis.match('*.css', {
  parser: fis.plugin('css-url-hash')
});
```

```css
background:url('xxx.jpg?h={hash}');
```

## 自定义参数名

```js
fis.match('*.html', {
  parser: fis.plugin('css-url-hash', {
    param : 'my_h'
  })
});
```

```css
background:url('xxx.jpg?my_h={hash}');
```