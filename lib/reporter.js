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
    var coverage = collector.getFinalCoverage();
    Object.keys(coverage).forEach(function(key) {
      coverage[key].code = [coverage[key].code];
    });
    return coverage;
  }
};
CoverageRemap.$inject = ['config.basePath', 'fileList'];

module.exports = CoverageRemap;