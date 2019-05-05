const { override, addDecoratorsLegacy, addBabelPlugins, useEslintRc, disableEsLint } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    'jsx-control-statements',
  ),
  addDecoratorsLegacy(),
  disableEsLint(),
  // useEslintRc(),
);