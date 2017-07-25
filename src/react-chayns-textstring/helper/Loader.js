const loaded = [];

export default class Loader {
    static loadScript(url) {
        if(loaded.indexOf(url) !== -1) return Promise.resolve();

        const head = Loader.getHead();
        const tag = Loader.getScriptTag(url);

        const retval = Loader.registerLoaders(tag).then(() => {
            loaded.push(url);
        });

        head.appendChild(tag);

        return retval;
    }

    static getHead() {
        return document.getElementsByTagName('head')[0];
    }

    static getScriptTag(url) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        return script;
    }

    static registerLoaders(tag) {
        const scriptTag = tag;

        return new Promise((resolve) => {
            scriptTag.onload = resolve;

            function ieLoadBugFix(scriptElement) {
                if (scriptElement.readyState === 'loaded' || scriptElement.readyState === 'completed') {
                    resolve();
                } else {
                    setTimeout(() => {
                        ieLoadBugFix(scriptElement);
                    }, 100);
                }
            }

            // for IE Browsers
            ieLoadBugFix(scriptTag);
        });
    }
}
