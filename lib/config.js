// Generated by CoffeeScript 1.3.3
var path;

path = require('path');

exports.defaults = require('./defaults');

exports.readConfig = function(options, name) {
  var config, configPath, key, value;
  if (name == null) {
    name = 'defaults';
  }
  configPath = path.join(process.cwd(), options.configPath, name);
  if (path.existsSync(configPath)) {
    try {
      config = require(configPath);
      for (key in config) {
        value = config[key];
        options[key] = value;
      }
      options.paths.concat([path.dirname(options.main)]);
    } catch (err) {

    }
  }
  return options;
};