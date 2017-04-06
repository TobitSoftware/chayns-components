var loaded = [];


export default class Loader {
    static loadScript(url) {

        if(loaded.indexOf(url) !== -1) return Promise.resolve();

        let head = Loader.getHead();
        let tag = Loader.getScriptTag(url);

        let retval = Loader.registerLoaders(tag).then(() => {
            loaded.push(url);
        });

        head.appendChild(tag);

        return retval;
    }

    static getHead() {
        return document.getElementsByTagName("head")[0];
    }

    static getScriptTag(url) {
        let script = document.createElement('script');
        script.type='text/javascript';
        script.src = url;

        return script;
    }

    static registerLoaders(tag) {
        return new Promise((resolve, reject) => {
            tag.onload = resolve;


            //for IE Browsers
            ieLoadBugFix(tag);

            function ieLoadBugFix(scriptElement){
                if (scriptElement.readyState=='loaded' || scriptElement.readyState=='completed') {
                    resolve();
                } else {
                    setTimeout(function() {
                        ieLoadBugFix(scriptElement);
                    }, 100);
                }
            }

        });
    }
}