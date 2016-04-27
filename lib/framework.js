var path = require('path');
var Builder = require('systemjs-builder');

function incl(pattern) {
  return {
    pattern: path.resolve(pattern),
    served: true,
    included: true,
    watched: true
  };
}

var initSystemjs = function(basePath, files, systemConfig, clientConfig) {
  systemConfig.config = systemConfig.config || {};
  systemConfig.imports = systemConfig.imports || [];

  if (systemConfig.configFiles)
    for (var i = systemConfig.configFiles.length - 1; i >= 0; i--)
      files.unshift(incl(path.resolve(basePath, systemConfig.configFiles[i])));

  files.unshift(incl(path.join(__dirname, 'baseurl.js')));
  files.unshift(incl(path.resolve(basePath, systemConfig.systemPath || require.resolve('systemjs/dist/system.src.js'))));

  files.push(incl(path.join(__dirname, 'adapter.js')));

  var builder = new Builder(basePath);
  systemConfig.configFiles.forEach(function(configFile) {
    builder.loadConfigSync(configFile, true, true);
  });
  var imports = systemConfig.imports.map(function(impt) {
    return builder.loader.normalizeSync(impt);
  });

  // now that we have imports, we need to glob the file system
  // glob(...)

  clientConfig.systemjs = {
    config: systemConfig.config,
    imports: systemConfig.imports
  };
};
initSystemjs.$inject = ['config.basePath', 'config.files', 'config.systemjs', 'config.client'];

module.exports = initSystemjs;