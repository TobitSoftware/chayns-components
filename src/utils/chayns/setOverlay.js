export default function setOverlay(enabled, { color, transition, mode }) {
    window.chayns.invokeCall({
        action: 116,
        value: {
            enabled,
            color,
            transition,
            mode,
            callback: 'window._chaynsCallbacks.showOverlay',
        }
    });

    return new Promise((resolve) => {
        window._chaynsCallbacks.showOverlay = resolve;
    });
}

export function showOverlay(config) {
    return setOverlay(true, config);
}

export function hideOverlay(config) {
    if (config) {
        // eslint-disable-next-line no-param-reassign
        delete config.color;
    }

    return setOverlay(false, config);
}
