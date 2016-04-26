Karma SystemJS Experiment
===

Created to explore:

* Coverage support with automatic source maps support for SystemJS plugins and transpilations
* Precompiling SystemJS transpilations so they are server-cached for quick test updates

### Running the Example

Ensure `jspm@beta` is installed globally. Then:

```
npm install
npm install github:systemjs/builder#master
cd test
npm install
jspm install
karma start
open coverage/Chrome.../index.html
```

Note that this must be run against SystemJS Builder master pending the next release.