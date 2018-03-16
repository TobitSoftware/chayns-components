import getMimeTypes from './getMimeTypes';

function isOfType(types) {
    return (file) => {
        const type = (file.type || '').toLowerCase();

        return (types.indexOf(type) !== -1);
    };
}

function isDoc() {
    return true;
}

export default function getCompareFunction(type) {
    if (type === 'image' ||
        type === 'audio' ||
        type === 'video') {
        return isOfType(getMimeTypes(type));
    }

    return isDoc;
}
