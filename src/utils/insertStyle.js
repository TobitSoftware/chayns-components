let styleMap = new Map();

export function insertStyle(id, css) {
    let styleTag = styleMap.get(id);
    if(!styleTag) {
        styleTag = document.createElement('style');
        styleTag.type = 'text/css';
        document.head.appendChild(styleTag);

        styleMap.set(id, styleTag);
    }

    if (styleTag.styleSheet){
        styleTag.styleSheet.cssText = css;
    } else {
        styleTag.appendChild(document.createTextNode(css));
    }
}