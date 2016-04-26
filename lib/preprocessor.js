var Builder = require('systemjs-builder');
var path = require('path');

var systemjsPreprocessor = function(systemConfig, basePath, clientConfig) {
  var builder = new Builder();
  for (var i = 0; i < systemConfig.configFiles.length; i++)
    builder.loadConfigSync(systemConfig.configFiles[i]);

  return function(content, file, done) {
    // add metadata for each preprocessed file to note it is preprocessed
    var moduleName = path.relative(basePath, file.path);
    var clientSystemConfig = clientConfig.systemjs.config = clientConfig.systemjs.config || {};
    clientSystemConfig.meta = clientSystemConfig.meta || {};
    var fileMeta = clientSystemConfig.meta[moduleName] = clientSystemConfig.meta[moduleName] || {};
    fileMeta.scriptLoad = true;

    var fileURL = 'file:///' + (file.path[0] == '/' ? file.path.substr(1) : file.path).replace(/\\/g, '/');
    builder.compile(fileURL, { sourceMaps: true })
    .then(function(output) {
      var sourceMap = JSON.parse(output.sourceMap);
      sourceMap.sources[0] = path.basename(file.originalPath);
      sourceMap.sourcesContent = [content];
      sourceMap.file = path.basename(file.path);
      file._preprocessedSourceMap = sourceMap;
      file._preprocessedSource = output.source;
      var datauri = 'data:application/json;charset=utf-8;base64,' + new Buffer(JSON.stringify(sourceMap)).toString('base64');
      done(null, output.source + '\n//# sourceMappingURL=' + datauri + '\n');
    }, function(err) {
      throw (err.stack || err);
    });
  };
};

systemjsPreprocessor.$inject = ['config.systemjs', 'config.basePath', 'config.client'];

module.exports = systemjsPreprocessor;