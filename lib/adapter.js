(function(karma) {
  karma.loaded = function() {};

  var systemConfig = karma.config.systemjs;

  System.config(systemConfig.config);

  var importPromises = [];
  for (var i = 0; i < systemConfig.imports.length; i++)
    importPromises.push(System.import(systemConfig.imports[i]));

  return Promise.all(importPromises)
  .then(function() {
    karma.start();
  }, function(e) {
    karma.start({
      error: e
    });
  });
})(__karma__);