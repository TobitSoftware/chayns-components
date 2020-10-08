import { shareOptions } from './sharingProvider';

function shareWithUrl(link) {
    if (link.startsWith('mailto')) {
        window.open(link);
    } else if (link.indexOf('chaynsqrcodegenerator') > 0) {
        chayns.openImage(link);
    } else {
        chayns.openUrlInBrowser(link);
    }
}

function shareWithApp(provider, message) {
    const value = {
        text: message,
        sharingApp: provider.providerId > -1 ? provider.providerId : -1,
        sharingAndroidApp: provider.androidIdentifier || null,
    };
    chayns.share(value);
}

function copyToClipboard(link) {
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

function webShareApi(link, linkText) {
    navigator.share({
        url: link,
        text: linkText,
    });
}

export default function share(provider, link, linkText) {
    switch (provider.id) {
        case shareOptions.COPY:
            copyToClipboard(link);
            break;
        case shareOptions.MAIL: {
            if (provider.useApp) {
                shareWithApp(provider, `${linkText} ${link}`.trim());
            } else {
                shareWithUrl(
                    provider.url.replace(
                        '{url}',
                        encodeURIComponent(`${linkText} ${link}`.trim())
                    )
                );
            }
            break;
        }
        case shareOptions.WHATSAPP:
            shareWithUrl(
                provider.url.replace(
                    '{url}',
                    encodeURIComponent(`${linkText} ${link}`.trim())
                )
            );
            break;
        case shareOptions.FACEBOOK:
            shareWithUrl(
                provider.url.replace('{url}', encodeURIComponent(link))
            );
            break;
        case shareOptions.TWITTER:
            shareWithUrl(
                provider.url
                    .replace('{url}', encodeURIComponent(link))
                    .replace('{linkText}', encodeURIComponent(linkText))
            );
            break;
        case shareOptions.QRCODE:
            shareWithUrl(
                provider.url
                    .replace('{url}', encodeURIComponent(link))
                    .replace('{linkText}', encodeURIComponent(linkText))
                    .replace('{color}', chayns.env.site.color.replace('#', ''))
            );
            break;
        case shareOptions.CUSTOM_CHAYNS:
            shareWithApp(provider, `${linkText} ${link}`.trim());
            break;
        case shareOptions.CUSTOM_ALL:
            webShareApi(link, linkText);
            break;
        default:
            break;
    }
}
