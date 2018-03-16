export const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/webp', 'image/x-icon', 'image/*'];
export const AUDIO_MIME_TYPES = ['audio/mp3', 'audio/mpeg3', 'audio/x-mpeg-3', 'audio/midi', 'audio/mpeg', 'audio/webm', 'audio/ogg', 'audio/wav', 'audio/x-mpeg', 'audio/x-wav', 'audio/*'];
export const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/x-flv', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/*'];

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
    if (type === 'images') {
        return isOfType(IMAGE_MIME_TYPES);
    }

    if (type === 'audio') {
        return isOfType(AUDIO_MIME_TYPES);
    }

    if (type === 'video') {
        return isOfType(VIDEO_MIME_TYPES);
    }

    return isDoc;
}
