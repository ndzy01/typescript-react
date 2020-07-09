module.exports = {
  // parser: '@typescript-eslint/parser', //定义ESLint的解析器
  // extends: ['plugin:@typescript-eslint/recommended'], //定义文件继承的子规范
  // plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
  env: {
    //指定代码的运行环境
    browser: true,
    node: true,
  },

  // env: {
  //   commonjs: true,
  //   node: true,
  //   browser: true,
  //   es6: true,
  //   jest: true,
  // },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'import', 'react-hooks'],
  ignorePatterns: ['node_modules/'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/display-name': 0,
    'react/prop-types': [0, 'off'],
    '@typescript-eslint/no-explicit-any': 0,
    'no-undef': 0,
    '@typescript-eslint/no-var-requires': 'off',
  },
  settings: {
    react: {
      version: 'latest', // "detect" automatically picks the version you have installed.
    },
  },
};
