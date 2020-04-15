# Tree Shaking

*In computing, tree shaking is a dead code elimination technique that is applied when optimizing code [...] that is loaded by a web browser. 
Rather than eliminating code that can never be executed, tree shaking starts from entry point and includes only the code 
that is guaranteed to be executed. It is succinctly described as "live code inclusion".* - [Wikipedia](https://en.wikipedia.org/wiki/Tree_shaking)

## Usage

The chayns-components support tree shaking. To use it, you have to configure your babel and webpack environment like this:

First of all, you need to install the ``babel-plugin-transform-imports`` plugin as a dev-dependency.

After this, you have to use a ``babel.config.js`` file for your babel configuration. 
In this file, you have to require the ``resolveAbsoluteImport.js`` file and add the following lines to the plugins section:

````javascript
const resolveAbsoluteImport = require('chayns-components/lib/utils/babel/resolveAbsoluteImport.js');
````

````javascript
['transform-imports', {
    'chayns-components': {
        transform: resolveAbsoluteImport,
        preventFullImport: true
    }
}]
````

### ESLint

In case that your imports are now throwing ESLint errors, you can install ``eslint-import-resolver-webpack``.
To enable it, you have to add it to your ``.eslintrc`` file:
````json
{
    "settings": {
        "import/resolver": "webpack"
    }
}
````

## Example Project

Take a look at the [chayns-react-template](https://github.com/TobitSoftware/chayns-react-template) and 
[chayns-react-redux-template](https://github.com/TobitSoftware/chayns-react-redux-template).
