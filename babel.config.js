module.exports = {
  presets: [
    "babel-preset-expo",
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    ["@babel/plugin-transform-flow-strip-types", {}],
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-runtime",
     ["module-resolver", {
        alias: {
          "^react-native$": "react-native-web"
        },
      }],
  ]
};

