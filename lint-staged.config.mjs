/** @type {import("lint-staged").Config} */
export default {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix'
  ],
  '*.{cjs,json}': [
    'eslint --fix'
  ],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix --allow-empty-input'
  ],
  '*.{scss,less,css,html}': [
    'stylelint --fix --allow-empty-input'
  ]
}
