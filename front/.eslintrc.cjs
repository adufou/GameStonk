module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "../.base.eslintrc.cjs",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "tsconfig.json",
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "react",
    ],
    "root": true,
    "rules": {
        "react/prop-types": "error",
        "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
        "react/jsx-first-prop-new-line": ["error", "multiline"],
        "react/jsx-closing-bracket-location": "error",
        "react/jsx-closing-tag-location": "error",
        "react/jsx-filename-extension": [
            "warn",
            {
                "extensions": [
                    ".tsx"
                ]
            }
        ],
        // TODO : Really ? https://timmousk.com/blog/react-hook-useeffect-has-a-missing-dependency/
        // Warning : rabbithole
        'react-hooks/exhaustive-deps': 'off',
    }
}
