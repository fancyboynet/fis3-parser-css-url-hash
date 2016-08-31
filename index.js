module.exports = function (content, file, opt) {
  // 只对 css 类文件进行处理
  if (!file.isCssLike){
    return content;
  }
  let path = require('path');
  var param = opt.param || 'h';
  let reg = /(url\(("|'))([^"']+)(\2\))/ig;
  let regAbsoluteUri = /^((http(s)?:)?\/)?\//i;
  return content.replace(reg, function ($0, $1, $2, $3, $4) {
    let uri = $3;
    if(!regAbsoluteUri.test($3)){
      let imgPath = path.resolve(file.dirname, $3);
      let img = fis.file.wrap(imgPath);
      uri = $3 + ($3.indexOf('?') === -1 ? '?' : '&') + param + '=' + img.getHash();
    }
    return $1 + uri + $4;
  });
};
