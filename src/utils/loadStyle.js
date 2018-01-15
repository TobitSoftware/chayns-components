const styleMap = new Map();

export default function loadStyle(id, src) {
    return new Promise((resolve, reject) => {
        let styleTag = styleMap.get(id);
        if(styleTag) {
            return resolve();
        }

        if(!styleTag) {
            styleTag = document.createElement('link');
            styleTag.rel = 'stylesheet';
            styleTag.type = 'text/css';
            document.head.appendChild(styleTag);

            styleMap.set(id, styleTag);
        }

        if (styleTag.href) {
            styleTag.href = src;
        } else {
            styleTag.setAttribute('href', src);
        }

        styleTag.onload = resolve;
        styleTag.onerror = reject;
    });
}
