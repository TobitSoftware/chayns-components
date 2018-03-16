import { AUDIO_MIME_TYPES, IMAGE_MIME_TYPES, VIDEO_MIME_TYPES } from '../constants/mimeTypes';

export default function getMimeTypes(type) {
    switch (type) {
        case 'image':
            return IMAGE_MIME_TYPES;
        case 'audio':
            return AUDIO_MIME_TYPES;
        case 'video':
            return VIDEO_MIME_TYPES;
        default:
            return ['*/*'];
    }
}
