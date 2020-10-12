export default function isInIframeDialog() {
    const scriptList = document.getElementsByTagName('script');
    for (let i = 0; i < scriptList.length; i++) {
        if (scriptList[i]?.src?.search(/\/js\/dialog\/v.*\/dialog-chayns.min.js/) >= 0) {
            return true;
        }
    }
    return false;
}
