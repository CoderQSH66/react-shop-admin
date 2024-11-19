module.exports = {
  // 继承推荐规范配置
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order'
  ],
  // 指定不同文件对应的解析器
  overrides: [
    {
      files: ['**/*.{css,vue,html}'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.{less}'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.{scss}'],
      customSyntax: 'postcss-scss',
      rule: {
        'scss/percent-placeholder-pattern': null,
        'scss/at-mixin-pattern': null
      }
    }
  ],
  // 自定义规则
  rules: {
    // 允许 global 、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer', 'if', 'each', 'mixin', 'use', 'extend']
      }
    ],
    'selector-class-pattern': null,
    'import-notation': null,
    // 'selector-no-vendor-prefix': null,
    // 'value-no-vendor-prefix': null,
    // 'alpha-value-notation': null,
    'color-function-notation': null,
    // 'rule-empty-line-before': null,
    'no-descending-specificity': null,
    // 'number-leading-zero': null,
    // 'declaration-block-no-redundant-longhand-properties': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports'
        },
        {
          type: 'at-rule',
          name: 'media'
        },
        'rules'
      ],
      {
        severity: 'error'
      }
    ]
  }
}
