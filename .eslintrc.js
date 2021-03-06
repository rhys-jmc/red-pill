const { defineConfig } = require("eslint-define-config");

const JS_RECOMMENDED = [
  "eslint:recommended",
  "plugin:array-func/recommended",
  "plugin:eslint-comments/recommended",
  "plugin:functional/external-recommended",
  "plugin:functional/recommended",
  "plugin:functional/stylitic",
  "plugin:import/recommended",
  "plugin:jest/recommended",
  "plugin:jest/style",
  "plugin:jest-formatting/recommended",
  "plugin:jsdoc/recommended",
  "plugin:lodash/recommended",
  "plugin:promise/recommended",
  "plugin:security/recommended",
  "plugin:sonarjs/recommended",
  "plugin:testing-library/react",
  "plugin:unicorn/recommended",
  "plugin:you-dont-need-lodash-underscore/compatible",
];

const TS_RECOMMENDED = [
  "plugin:@typescript-eslint/recommended",
  "plugin:import/typescript",
];

const REACT_NAITVE_RECOMMENDED = [
  "plugin:import/react",
  "plugin:jsx-a11y/recommended",
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:react-native/all",
  "plugin:react-native-a11y/all",
];

module.exports = defineConfig({
  env: {
    commonjs: true,
    es6: true,
    node: true,
    "jest/globals": true,
    "react-native/react-native": true,
  },
  plugins: [
    "@typescript-eslint",
    "array-func",
    "eslint-comments",
    "functional",
    "import",
    "jest",
    "jest-formatting",
    "jsdoc",
    "jsx-a11y",
    "lodash",
    "only-error",
    "promise",
    "react",
    "react-hooks",
    "security",
    "sonarjs",
    "testing-library",
    "unicorn",
    "woke",
    "you-dont-need-lodash-underscore",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/resolver": { typescript: { alwaysTryTypes: true } },
    react: { version: "detect" },
  },
  extends: [...JS_RECOMMENDED, "prettier"],
  reportUnusedDisableDirectives: true,
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "func-style": ["error", "expression"],
    "prefer-arrow-callback": "error",

    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", disallowTypeAnnotations: true },
    ],

    "array-func/prefer-array-from": "off",

    "functional/functional-parameters": "off",
    "functional/immutable-data": [
      "error",
      {
        assumeTypes: false,
        ignoreImmediateMutation: true,
        ignoreAccessorPattern: ["module.exports", "**.current"],
      },
    ],
    "functional/no-conditional-statement": "off",
    "functional/no-expression-statement": "off",
    "functional/no-mixed-type": "off",
    "functional/no-throw-statement": "off",
    "functional/no-return-void": "off",

    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: false },
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
      },
    ],
    "import/no-default-export": "error",

    // disable redundant typescript rules
    "import/default": "off",
    "import/named": "off",
    "import/namespace": "off",

    "lodash/prefer-lodash-method": "off",

    "react/jsx-no-literals": "error",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    "react-native/no-raw-text": ["error", { skip: ["MonoText", "ThemedText"] }],

    "security/detect-object-injection": "off",

    "testing-library/prefer-screen-queries": "off",

    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      { ignore: [/dir/i, /doc/i, /param/i, /prev/i, /props/i, /ref/i] },
    ],
  },
  overrides: [
    {
      files: ["**/*.jsx"],
      extends: [...REACT_NAITVE_RECOMMENDED, "prettier"],
      rules: { "unicon/no-null": "off" },
    },
    { files: ["**/*.ts"], extends: [...TS_RECOMMENDED, "prettier"] },
    {
      files: ["**/*.tsx"],
      extends: [...TS_RECOMMENDED, ...REACT_NAITVE_RECOMMENDED, "prettier"],
      rules: { "react/prop-types": "off", "unicorn/no-null": "off" },
    },
    {
      files: ["App.tsx"],
      rules: {
        "import/no-default-export": "off",
        "unicorn/filename-case": "off",
      },
    },
    {
      files: ["**/*.spec.tsx"],
      rules: { "functional/no-expression-statement": "off" },
    },
  ],
});
