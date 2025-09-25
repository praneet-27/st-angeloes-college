module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'jsx-a11y/iframe-has-title': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
