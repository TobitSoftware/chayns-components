export const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/webp', 'image/x-icon', 'image/*'];

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
