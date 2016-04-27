// Karma configuration
// Generated on Fri Apr 22 2016 23:06:24 GMT+0200 (SAST)

module.exports = function(config) {
  config.set({
    plugins: [
        require('../'),
        'karma-mocha',
        'karma-chrome-launcher',
        'karma-coverage'
    ],

    client: {
        mocha: {
            ui: 'tdd'
        }
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    systemjs: {
        baseURL: '.',
        systemPath: 'jspm_packages/system.src.js',
        configFiles: ['jspm.browser.js', 'jspm.config.js'],
        imports: ['example-tests/index.js'],
        config: {}
    },

    
    frameworks: ['systemjs', 'mocha'],
    preprocessors: {
        'example-app/*.js': ['systemjs', 'coverage']
    },


    // list of files / patterns to load in the browser
    files: [
        { pattern: 'example-app/**/*.js', included: false },
        { pattern: 'example-tests/**/*.js', included: false },
        { pattern: 'jspm_packages/**/*', included: false }
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'systemjs-remap-coverage', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
