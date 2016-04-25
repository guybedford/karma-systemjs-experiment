SystemJS.config({
  transpiler: "plugin-traceur",
  traceurOptions: {
    "asyncFunctions": true
  },
  packages: {
    "example-app": {
      "main": "example-app.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "plugin-traceur": "npm:systemjs-plugin-traceur@0.0.1",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.107",
    "unexpected": "npm:unexpected@10.13.2"
  },
  packages: {
    "npm:systemjs-plugin-traceur@0.0.1": {
      "map": {
        "traceur": "github:jmcriffey/bower-traceur@0.0.95",
        "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.95"
      }
    }
  }
});
