var path = require('path');

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

  clientConfig.systemjs = {
    config: systemConfig.config,
    imports: systemConfig.imports
  };
};
initSystemjs.$inject = ['config.basePath', 'config.files', 'config.systemjs', 'config.client'];

module.exports = initSystemjs;