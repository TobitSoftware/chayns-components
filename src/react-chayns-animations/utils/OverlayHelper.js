import * as chaynsCall from '../../utils/chayns/setOverlay';

const overlay = document.createElement('div');
let closeListener = null;

// Timeouts
let hideTimeout;
let removeChildTimeout;
let showTimeout;
let setListenerTimeout;

function initOverlay() {
    overlay.style.position = 'fixed';

    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';

    document.body.appendChild(overlay);
}

export function hideOverlay({ transitionTime, color } = {}) {
    clearInterval(showTimeout);
    clearInterval(setListenerTimeout);

    chaynsCall.hideOverlay({
        color,
        transition: `${transitionTime}ms`,
        mode: 1,
    });

    overlay.style.transition = `background-color ${transitionTime || 0}ms ease`;

    hideTimeout = window.setTimeout(() => {
        overlay.style.backgroundColor = 'transparent';
    }, transitionTime ? 10 : 0);

    removeChildTimeout = window.setTimeout(() => {
        if(overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, transitionTime || 0);
}

export function showOverlay({
    transitionTime,
    zIndex,
    color,
    onClose,
} = {}) {
    initOverlay();

    clearInterval(hideTimeout);
    clearInterval(removeChildTimeout);

    closeListener = onClose;

    chaynsCall.showOverlay({
        color,
        transition: `${transitionTime}ms`,
        mode: 1,
    }).then(() => {
        if(closeListener) {
            closeListener();
        }
    });

    overlay.style.zIndex = zIndex;
    overlay.style.transition = `background-color ${transitionTime || 0}ms ease`;

    overlay.onclick = null;
    setListenerTimeout = window.setTimeout(() => {
        overlay.onclick = () => {
            if(closeListener) {
                closeListener();
            }
        };
    }, transitionTime || 0);

    showTimeout = window.setTimeout(() => {
        overlay.style.backgroundColor = color;
    }, transitionTime ? 10 : 0);
}

export default {
    showOverlay,
    hideOverlay,
};
