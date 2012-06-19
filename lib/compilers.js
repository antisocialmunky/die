// Generated by CoffeeScript 1.3.3
var fs, path;

fs = require('fs');

path = require('path');

module.exports = {
  jade: function(fn) {
    var compiled, content, jade;
    jade = require('jade');
    content = fs.readFileSync(fn, 'utf8');
    compiled = jade.compile(content, {
      client: true,
      debug: false,
      compileDebug: false
    });
    return "module.exports = " + compiled + ";";
  },
  styl: function(fn) {
    var bootstrap, content, nib, result, stylus;
    bootstrap = require('bootstrap-hemlock');
    nib = require('nib');
    stylus = require('stylus');
    content = fs.readFileSync(fn, 'utf8');
    result = '';
    stylus(content).include(path.dirname(fn)).use(bootstrap()).use(nib()).render(function(err, css) {
      if (err) {
        throw err;
      }
      return result = css;
    });
    return result;
  }
};