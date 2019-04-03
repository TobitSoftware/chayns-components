function shareWithUrl(provider, link) {
    const openLink = provider.url.replace('{url}', link);
    chayns.openUrlInBrowser(openLink);
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
    aux.setAttribute('value', link);
    document.body.appendChild(aux);
    aux.select();
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
