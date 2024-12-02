// react-config
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  stylistic: {
    /** stylistic-eslint配置规则：https://eslint.style/packages/default */
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    overrides: {
      'style/comma-dangle': ['error', 'never'],
      'style/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false
      }],
      'style/object-curly-newline': ['error', {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true
        }
      }]
    }
  },
  react: {
    overrides: {
      'react-dom/no-unsafe-target-blank': 'off',
      'no-console': 'off',
      'antfu/top-level-function': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-useless-return': 'off',
      'ts/no-use-before-define': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          specialCharacters: 'keep',
          matcher: 'minimatch',
          internalPattern: ['~/**'],
          newlinesBetween: 'never',
          maxLineLength: undefined,
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown'
          ],
          customGroups: {
            type: {
            },
            value: {
            }
          },
          environment: 'node'
        }
      ]
    }
  },
  // 忽略文件
  ignore: ['dist', 'node_modules', 'public', 'src/**/*.d.ts', '*.md', '*.mdx', '*.woff', '*.ttf', '*.idea', '*.local', '/docs', '.husky', 'bin', 'Dockerfile', '*.json']
})
