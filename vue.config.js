const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8086,
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "SVR SOFT",
    },
  },
});
