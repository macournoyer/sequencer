const pluginTailwind = require('eleventy-plugin-tailwindcss');

module.exports = (config) => {
  config.addPlugin(pluginTailwind, {
    src: 'assets/css/*'
  });

  config.addPassthroughCopy('assets/audio/*');
  config.addPassthroughCopy('assets/js/*');

  config.addWatchTarget("assets/css");
  config.addWatchTarget("assets/js");
};
