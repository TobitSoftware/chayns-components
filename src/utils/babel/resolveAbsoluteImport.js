/**
 * Since partial imports of the library now work, this just returns the library
 * path, not an absolute path anymore. This is only kept to not break any builds
 * and will be removed with the next major version.
 */
module.exports = function resolveAbsoluteImport() {
    return 'chayns-components/dist/esm/index.js';
};
