/** @type {import("prettier").Config} */
const config = {
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  bracketSpacing: true,
  experimentalTernaries: true,
  printWidth: 80,
  quoteProps: "as-needed",
  overrides: [
    {
      files: "**.ts",
      parser: "babel-ts"
    }
  ]
};

module.exports = config;
