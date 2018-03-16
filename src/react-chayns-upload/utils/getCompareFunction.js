export const IMAGE_MIME_TYPES = ['images/png', 'image/jpeg'];

function isImage(file) {
    const type = (file.type || '').toLowerCase();

    return (IMAGE_MIME_TYPES.indexOf(type) !== -1);
}

function isDoc() {
    return true;
}

export default function getCompareFunction(type) {
    if (type === 'images') {
        return isImage;
    }

    return isDoc;
}
