SystemJS.config({
  baseURL: ".",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "example-app/": "example-app/"
  }
});
