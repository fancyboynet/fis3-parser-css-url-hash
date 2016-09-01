"use strict";
module.exports = function (content, file, opt) {
  // 只对 css 类文件进行处理
  if (!file.isCssLike){
    return content;
  }
  let path = require('path');
  var param = opt.param || 'h';
  let reg = /url\((.+?)\)/ig;
  let regAbsoluteUri = /^((http(s)?:)?\/)?\//i;
  let regBase64Uri = /^data:image\//i;
  return content.replace(reg, function ($0, $1) {
    let uri = $1.replace(/['"]/g, '');
    let newUri = 'url(' + uri + ')';
    if(regAbsoluteUri.test(uri)){
      return newUri;
    }
    if(regBase64Uri.test(uri)){
      return newUri;
    }
    let filePath = path.resolve(file.dirname, uri);
    let file2 = fis.file.wrap(filePath);
    newUri = uri + (uri.indexOf('?') === -1 ? '?' : '&') + param + '=' + file2.getHash();
    return newUri;
  });
};
