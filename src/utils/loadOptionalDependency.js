import loadScript from './loadScript';
import loadStyle from './loadStyle';

export default function loadOptionalDependency(module, windowModule, jsArray, cssArray, returnPromise = true) {
    let emojione = null;
    try {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        emojione = require(module);
    } catch(ex) {
        emojione = window[windowModule];
    }

    if(emojione) {
        if(returnPromise) {
            return Promise.resolve(emojione);
        }

        return emojione;
    }

    const loadArray = [];

    if(!emojione) {
        for(let i = 0, z = jsArray.length; i < z; i += 1) {
            loadArray.push(loadScript(jsArray[i], jsArray[i]));
        }

        for(let i = 0, z = cssArray.length; i < z; i += 1) {
            loadArray.push(loadStyle(cssArray[i], cssArray[i]));
        }
    }

    if(returnPromise) {
        return Promise.all(loadArray);
    }

    return emojione;
}
