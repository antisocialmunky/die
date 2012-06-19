// Generated by CoffeeScript 1.3.3
var child, express, path;

child = require('child_process');

express = require('express');

path = require('path');

module.exports = function(die) {
  var app,
    _this = this;
  app = express.createServer();
  die.readConfig(app.settings.env);
  app.configure(function() {
    app.set('port', die.options.port);
    if (path.existsSync(die.options["public"])) {
      return app.use(express["static"](die.options["public"]));
    } else {
      return app.use(express["static"]('.'));
    }
  });
  app.configure('test', function() {
    return app.set('port', die.options.port + 1);
  });
  app.configure('development', function() {
    app.use(express.logger());
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure('production', function() {
    return app.use(express.errorHandler());
  });
  if (die.options.cssPath) {
    app.get(die.options.cssPath, function(req, res) {
      res.header('Content-Type', 'text/css');
      return res.send(die.cssPackage().compile());
    });
  }
  if (die.options.jsPath) {
    app.get(die.options.jsPath, function(req, res) {
      res.header('Content-Type', 'application/javascript');
      return res.send(die.hemPackage().compile());
    });
  }
  app.run = function(cb) {
    app.listen(app.settings.port, function() {
      console.log("" + app.settings.env + " server up and running at http://localhost:" + (app.address().port));
      if (cb) {
        return cb();
      }
    });
    return app;
  };
  return app;
};