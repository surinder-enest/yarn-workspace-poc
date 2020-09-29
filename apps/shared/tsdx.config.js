const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: true,
        modules: true,
      }),
      terser()
    );
    return config;
  },
};
