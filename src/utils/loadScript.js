const scriptMap = new Map();

export default function loadScript(id, src) {
    return new Promise((resolve, reject) => {
        let scriptTag = scriptMap.get(id);
        if(scriptTag) {
            return resolve();
        }

        scriptTag = document.createElement('script');
        scriptTag.type = 'application/javascript';
        document.body.appendChild(scriptTag);

        scriptMap.set(id, scriptTag);

        if (scriptTag.src) {
            scriptTag.src = src;
        } else {
            scriptTag.setAttribute('src', src);
        }

        scriptTag.onload = resolve;
        scriptTag.onerror = reject;

        return null;
    });
}
