module.exports = {
  productionSourceMap: false,

  css: {
    sourceMap: process.env.NODE_ENV !== "production",
    loaderOptions: {
      sass: {
        data: `
          @import "./src/assets/stylesheets/_variables.scss";
          @import "./src/assets/stylesheets/_mixins.scss";
        `
      }
    }
  }
};
