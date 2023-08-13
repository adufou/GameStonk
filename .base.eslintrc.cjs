module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint",
        "unused-imports",
        "import",
        "import-newlines",
    ],
    "root": true,
    "rules": {
        "max-len": ["error", { "code": 120, "comments": 160, "tabWidth": 4 }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_"
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                max: 1,
                maxEOF: 0
            }
        ],
        'import/order': [
            'error',
            {
                groups: ['external', 'unknown', 'builtin'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'never',
                'warnOnUnassignedImports': true
            },
        ],
        // 'sort-imports': [
        //     'error',
        //     {
        //         ignoreCase: true,
        //         ignoreDeclarationSort: true,
        //         ignoreMemberSort: false,
        //         memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        //     },
        // ],
        // https://eslint.org/docs/latest/rules/no-restricted-imports
        "no-restricted-imports": ["error", {
            // "paths": ["import1", "import2"],
            "patterns": [
                {
                    group: ["**/*.scss", "**/*.css", "!@/index.scss"],
                    message: "Please import the .scss file in the corresponding _index.scss or create one."
                },
                {
                    group: ["./*", "../*"],
                    message: "Please import relative path using the @ syntax for src/ (see tsconfig)"
                }
            ],
        }],
        "import-newlines/enforce": [
            "error",
            {
                "items": 1,
                "semi": true,
            }
        ],
        'padded-blocks': ["error", "never"],
        'object-curly-newline': ["error", { "minProperties": 2 }],
        'object-property-newline': "error",
        "comma-dangle": ["error", "always-multiline"],
        'object-curly-spacing': ["error", "always"],
        'computed-property-spacing': ["error", "always"],
        'array-bracket-spacing': 'off',
        curly: ['error', 'all'],
        "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }],
        "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
        'no-template-curly-in-string': 'warn',
        'block-spacing': ['error', 'always'],
        'template-curly-spacing': ["error", "always"],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
    }
}
