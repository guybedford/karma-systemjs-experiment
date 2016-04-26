var path = require('path');

var CoverageRemap = function(basePath, fileList) {
  this.onBrowserComplete = function(browser, result) {
    if (result.coverage)
      result.coverage = remap(result.coverage);
  };
  this.onSpecComplete = function(browser, result) {
    if (result.coverage)
      result.coverage = remap(result.coverage);
  };

  var remapIstanbul = require('remap-istanbul').remap;
  function remap(coverage) {
    // karma coverage must have no source cache for this thing to work
    var kcss = require.resolve('karma-coverage/lib/source-cache.js', require.main.filename);
    var sourceStore = require(kcss).get(basePath);
    Object.keys(sourceStore).forEach(function(key) {
      delete sourceStore[key];
    });

    var servedFiles = fileList.files.served;
    var collector = remapIstanbul(coverage, {
      basePath: basePath,
      readFile: function(filePath) {
        var file = servedFiles.find(function(file) {
          return file.path == filePath;
        });
        if (!file)
          throw new Error('Unable to lookup source for ' + filePath);
        return file._preprocessedSource + (file._preprocessedSourceMap ? '\n//# sourceMappingURL=' + filePath.split(path.sep).pop() + '.map' : '');
      },
      readJSON: function(filePath) {
        filePath = filePath.substr(0, filePath.length - 4)
        var file = servedFiles.find(function(file) {
          return file.path == filePath;
        });
        if (!file)
          throw new Error('Unable to lookup source map for ' + filePath);
        file._preprocessedSourceMap.sources = file._preprocessedSourceMap.sources.map(function(file) {
          return path.relative(basePath, path.resolve(path.dirname(filePath), file));
        });
        return file._preprocessedSourceMap;
      }
    });
    return collector.getFinalCoverage();
  }
};
CoverageRemap.$inject = ['config.basePath', 'fileList'];

module.exports = CoverageRemap;