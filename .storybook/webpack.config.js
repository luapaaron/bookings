const path = require("path");

module.exports = ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need

  config.module.rules.push({
    test: /\.svg$/,
    include: path.resolve(__dirname, "../src/assets/icons"),
    use: "svg-sprite-loader",
  });

  config.resolve.alias["@assets"] = path.resolve(__dirname, "../src/assets");
  config.resolve.alias["@icons"] = path.resolve(__dirname, "../src/assets/icons");
  config.resolve.alias["@assetsImages"] = path.resolve(__dirname, "../src/assets/images");
  config.resolve.alias["@utils"] = path.resolve(__dirname, "../src/utils");
  config.resolve.alias["@views"] = path.resolve(__dirname, "../src/views");
  config.resolve.alias["@layouts"] = path.resolve(__dirname, "../src/views/layouts");
  config.resolve.alias["@constants"] = path.resolve(__dirname, "../src/constants");
  config.resolve.alias["@viewsComponents"] = path.resolve(__dirname, "../src/views/components");
  config.resolve.alias["@styles"] = path.resolve(__dirname, "../src/styles");
  config.resolve.alias["@reduxModules"] = path.resolve(__dirname, "../src/reduxModules");
  config.resolve.alias["@hocs"] = path.resolve(__dirname, "../src/views/hocs'");
  config.resolve.alias["@providers"] = path.resolve(__dirname, "../src/providers");
  config.resolve.alias["@components"] = path.resolve(__dirname, "../src/components");
  config.resolve.alias["@containers"] = path.resolve(__dirname, "../src/views/containers");
  config.resolve.alias["@widgets"] = path.resolve(__dirname, "../src/views/widgets");
  config.resolve.alias["images"] = path.resolve(__dirname, "../src/images");



  config.module.rules[8].test = /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|wclearebp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

  // Return the altered config
  return config;
};
