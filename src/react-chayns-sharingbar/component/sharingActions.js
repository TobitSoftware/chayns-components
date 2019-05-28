function shareWithUrl(provider, link) {
    const openLink = provider.url.replace('{url}', link);
    if (openLink.startsWith('mailto')) {
        window.open(openLink);
    } else {
        chayns.openUrlInBrowser(openLink);
    }
}

function shareWithApp(provider, link) {
    const value = {
        text: link,
        sharingApp: provider.providerId > -1 ? provider.providerId : -1,
        sharingAndroidApp: provider.androidIdentifier || null,
    };
    chayns.share(value);
}

function copyToClipboard(provider, link) {
    const aux = document.createElement('input');
    const range = document.createRange();
    aux.setAttribute('value', link);
    aux.setAttribute('contenteditable', 'true');
    document.body.appendChild(aux);
    aux.select();
    range.selectNodeContents(aux);
    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);
    aux.setSelectionRange(0, 999999);
    document.execCommand('copy');
    document.body.removeChild(aux);
}

function webShareApi(provider, link) {
    navigator.share({
        url: link,
    });
}

const actions = {
    0: copyToClipboard,
    1: shareWithUrl,
    2: shareWithApp,
    3: webShareApi,
};

export default function share(provider, link) {
    actions[provider.action](provider, link);
}
