module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
    ],
    rules: {
      // Add your custom rules here
      'vue/multi-word-component-names': 'off', // Disable multi-word component name rule
    },
  };
  