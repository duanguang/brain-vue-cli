// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "eqeqeq":["error", "always"],
    "no-alert":"error",
    "no-empty-function":"error",
    "no-eval":"error",
    "max-lines": ["error", 700],
    "max-statements": ["error", 50],
    "no-var": "error",
    "no-multiple-empty-lines": "off",
    "no-console":process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-dupe-args": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-extra-semi": "error",
    'indent': ['off', 0, {'SwitchCase': 1}],
    'comma-spacing': ['off', {'before': false, 'after': true}],
    "semi-spacing": ["off", {"before": false, "after": true}],
     "semi":["off", "always",{ "omitLastInOneLineBlock": true }],
    "space-infix-ops": ["off", {"int32Hint": false}],
    "keyword-spacing":["off"],
    "space-before-blocks":['off'],
    "space-before-function-paren":['off'],
    "key-spacing":['off'],
    "arrow-spacing":['off'],
    "quotes":['off'],
    "comma-dangle":['off'],
    "spaced-comment":['off'],
    "no-unused-vars":['off'],
    "brace-style":['off'],
    "padded-blocks":['off'],
    "object-property-newline":['off'],
    "no-multi-spaces":['off'],
    "no-unreachable":['off'],
    "no-unneeded-ternary":['off'],
    "object-curly-even-spacing":['off'],
    "no-duplicate-imports":['off'],
    "no-useless-constructor":['off'],
    "eol-last":['off'],
    "no-undef":['off'],
    "camelcase":['off']
  }
}
