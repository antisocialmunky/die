// Generated by CoffeeScript 1.3.3
var fs, path, wrench;

fs = require('fs');

path = require('path');

wrench = require('wrench');

module.exports = function(_arg) {
  var cssPackage, dest, hemPackage, options, source, src;
  options = _arg.options, hemPackage = _arg.hemPackage, cssPackage = _arg.cssPackage;
  src = options["public"] || '.';
  dest = options.dist || 'dist/';
  wrench.rmdirSyncRecursive(dest, true);
  fs.mkdirSync(dest);
  wrench.copyDirSyncRecursive(src, dest);
  source = hemPackage().compile();
  fs.writeFileSync(path.join(dest, options.jsPath), source);
  source = cssPackage().compile();
  return fs.writeFileSync(path.join(dest, options.cssPath), source);
};