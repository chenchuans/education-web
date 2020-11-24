// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'vue/html-indent': ['error', 4],
        'vue/require-prop-types': ['warn'],
        'vue/require-default-prop': ['warn'],

      // allow paren-less arrow functions
        'arrow-parens': 0,

        'generator-star-spacing': 0,

        'indent': ['error', 4, {
            'SwitchCase': 1
        }],

        'semi': ['error', 'always'],

        'operator-linebreak': ['error', 'before'],

        'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never' }],

        // allow template curly in string
        'no-template-curly-in-string': 0,

        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        // disallow trailing comma
        "comma-dangle": ["error", "never"]
    }
}