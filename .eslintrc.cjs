module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "react", "simple-import-sort"],
  rules: {
    "@typescript-eslint/no-empty-interface": [0],
    "no-console": ["error"],
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "if", "multiline-const", "function"],
      },
      {
        blankLine: "always",
        prev: ["function"],
        next: "*",
      },
    ],
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // External
          ["react", "^@?\\w"],

          // Side effect imports
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
  },
  ignorePatterns: ["src/**/*.test.ts", "src/frontend/generated/*"],
};
