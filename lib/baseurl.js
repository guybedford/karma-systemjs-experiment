(function() {
  System.config({ baseURL: '/base/' })

  // hack to ensure baseURL is not overridden by other configs
  var systemConfig = System.config;
  System.config = function(cfg) {
    delete cfg.baseURL;
    systemConfig.call(this, cfg);
  };
})();