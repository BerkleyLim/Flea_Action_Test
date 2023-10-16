module.exports = {
  root: true,
  env: {
      browser: true,
      es6: true,
  },
  extends: [
      '@react-native',
      "plugin:@typescript-eslint/recommended",
       // typescript 표준 규칙 모음
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      // import 관련 규칙 모음

      "plugin:prettier/recommended",
      "prettier/@typescript-eslint",
      "prettier/react",
       // prettier 관련 규칙 모음
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off']
  }
};
