/**
 * Re-exports the CJS files that had their CSS imports removed. Mostly useful
 * for Next.js, where importing CSS from within node_modules does not work.
 */
module.exports = require('./dist/cjs-split-css/index.js');
