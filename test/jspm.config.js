SystemJS.config({
  transpiler: "plugin-babel",
  packages: {
    "example-app": {
    }
  },
  map: {
    "unexpected": "npm:unexpected@10.13.2"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.9"
  },
  packages: {}
});
