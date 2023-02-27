const path = require("path");

const checkType = (filenames) => `tsc --project tsconfig.json --pretty --noEmit`;

const prettier = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx,css,scss}": [prettier],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{ts,tsx}": [checkType],
};
