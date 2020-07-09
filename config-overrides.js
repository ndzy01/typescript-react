const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra');

// const darkThemeVars = require("antd/dist/dark-theme");

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 路径别名
  addWebpackAlias({
    ['mock']: path.resolve(__dirname, 'src/mock'),
    ['containers']: path.resolve(__dirname, 'src/containers'),
    ['@components']: path.resolve(__dirname, 'src/components'),
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      hack: `true;@import "${require.resolve(
        'antd/lib/style/color/colorPalette.less'
      )}";`,
      // ...darkThemeVars,
      // "@primary-color": "#02b875"
    },
    localIdentName: '[local]--[hassh:base64:5]',
  })
);
