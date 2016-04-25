module.exports = {
  'framework:systemjs': ['factory', require('./framework.js')],
  'preprocessor:systemjs': ['factory', require('./preprocessor.js')],
  'reporter:systemjs-remap-coverage': ['type', require('./reporter.js')]
};