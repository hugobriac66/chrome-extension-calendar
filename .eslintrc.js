module.exports = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    rules: {
        indent: ['error', 4],
    },
    ignorePatterns: ['dist/*'],
    env: {
        browser: true,
        node: true,
    },
};
