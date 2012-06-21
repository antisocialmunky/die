// Generated by CoffeeScript 1.3.3
var basename, bootstrap, browserify, concatRead, dirname, fs, jade, join, nib, path, resolve, stylus, utils;

bootstrap = require('bootstrap-hemlock');

browserify = require('browserify');

fs = require('fs');

jade = require('jade');

nib = require('nib');

stylus = require('stylus');

path = require('path');

basename = path.basename;

dirname = path.dirname;

join = path.join;

utils = require('./utils');

concatRead = utils.concatRead;

resolve = utils.resolve;

module.exports = {
  css: function(_arg, base) {
    var bundler, filename, main;
    main = _arg.main;
    if (base == null) {
      base = '';
    }
    main = join(base, main);
    filename = resolve(['.css', '.styl'], main);
    return bundler = {
      bundle: function() {
        var body, result;
        body = fs.readFileSync(filename, 'utf8');
        result = '';
        stylus(body).set('filename', filename).include(dirname(filename)).use(bootstrap()).use(nib()).render(function(err, css) {
          if (err) {
            throw err;
          }
          return result = css;
        });
        return result;
      }
    };
  },
  js: function(_arg, base) {
    var b, lib, libs, main;
    main = _arg.main, libs = _arg.libs;
    if (base == null) {
      base = '';
    }
    b = browserify();
    b.register('.jade', function(body, filename) {
      var func;
      this.ignore(filename);
      func = jade.compile(body, {
        client: true,
        debug: false,
        compileDebug: false
      });
      return "module.exports = " + (func.toString());
    });
    libs = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = libs.length; _i < _len; _i++) {
        lib = libs[_i];
        _results.push(join(base, lib));
      }
      return _results;
    })();
    b.prepend(concatRead(libs));
    b.require("./" + (basename(main)), {
      dirname: dirname(join(base, main))
    });
    return b;
  }
};