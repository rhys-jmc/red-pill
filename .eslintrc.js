/* eslint-disable unicorn/prefer-module */
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
    "functional/no-expression-statement": [
      "error",
      {
        ignorePattern: [
          "module.exports",
          "ReactDOM.render",
          "console",
          "event.preventDefault",
          "useEffect",
          "set",
        ],
      },
    ],

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

    "react-native/no-raw-text": ["error", { skip: ["MonoText"] }],

    "security/detect-object-injection": "off",

    "unicorn/prefer-node-protocol": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      { ignore: [/dir/i, /param/i, /props/i] },
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
    { files: ["App.tsx"], rules: { "unicorn/filename-case": "off" } },
    {
      files: ["**/*.spec.tsx"],
      rules: { "functional/no-expression-statement": "off" },
    },
    {
      files: ["babel.config.js"],
      rules: { "unicorn/prefer-module": "off" },
    },
  ],
});
/* eslint-enable unicorn/prefer-module */
