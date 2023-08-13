module.exports = {
    env: {
        node: true,
        jest: true,
    },
    extends: [
        "../.base.eslintrc.cjs",
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    root: true,
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // None
    },
};
