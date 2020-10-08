/* eslint-disable max-len */
export const shareOptions = {
    COPY: 0,
    MAIL: 1,
    WHATSAPP: 2,
    FACEBOOK: 3,
    TWITTER: 5,
    QRCODE: 6,
    CUSTOM_CHAYNS: 10,
    CUSTOM_ALL: 11,
};

export const shareProvider = [
    {
        id: shareOptions.WHATSAPP,
        providerId: 1,
        name: 'WhatsApp',
        androidIdentifier: 'com.whatsapp',
        icon: 'fab fa-whatsapp',
        url: 'https://api.whatsapp.com/send?text={url}',
        available: true,
    },
    {
        id: shareOptions.COPY,
        providerId: -1,
        name: 'Zwischenablage',
        androidIdentifier: null,
        icon: 'fa fa-copy',
        url: null,
        available: true,
    },
    {
        id: shareOptions.MAIL,
        providerId: 0,
        name: 'Mail',
        androidIdentifier: null,
        icon: 'fa fa-envelope',
        url: 'mailto:?body={url}',
        available: true,
    },
    {
        id: shareOptions.FACEBOOK,
        providerId: 2,
        name: 'Facebook',
        androidIdentifier: 'com.facebook.katana',
        icon: 'fab fa-facebook-f',
        url:
            'http://www.facebook.com/dialog/share?app_id=472449496108149&display=page&href={url}&redirect_uri=http://facebook.com',
        available: true,
    },
    {
        id: shareOptions.TWITTER,
        providerId: 5,
        name: 'Twitter',
        androidIdentifier: null,
        icon: 'fab fa-twitter',
        url:
            'http://twitter.com/intent/tweet?text={linkText}&url={url}&hashtags=chayns',
        available: true,
    },
    {
        id: shareOptions.QRCODE,
        providerId: 6,
        name: 'QR-Code',
        androidIdentifier: null,
        icon: 'fas fa-qrcode',
        url:
            'https://webapi.tobit.com/chaynsqrcodegenerator/v1.0/png?width=500&color={color}&value={url}&text={linkText}',
        available: true,
    },
    {
        id: shareOptions.CUSTOM_CHAYNS,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: 'fal fa-share-alt',
        url: null,
        available: false,
    },
    {
        id: shareOptions.CUSTOM_ALL,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: 'fal fa-share-alt',
        url: null,
        available: false,
    },
];
