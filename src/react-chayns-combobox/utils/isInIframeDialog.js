import { isServer } from '../../utils/isServer';

export default function isInIframeDialog() {
    if (isServer()) return false;

    const scriptList = document.getElementsByTagName('script');
    for (let i = 0; i < scriptList.length; i++) {
        if (
            scriptList[i]?.src?.search(
                /\/js\/dialog(?:\/(?:staging|qa))?\/v.*\/dialog-chayns.min.js/i
            ) >= 0
        ) {
            return true;
        }
    }
    return false;
}
