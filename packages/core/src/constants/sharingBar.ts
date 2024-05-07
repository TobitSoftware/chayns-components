import type { SharingBarProvider } from '../types/sharingBar';

export const SHAREOPTIONS = {
    COPY: 0,
    MAIL: 1,
    WHATSAPP: 2,
    FACEBOOK: 3,
    TWITTER: 5,
    QRCODE: 6,
    CUSTOM_CHAYNS: 10,
    CUSTOM_ALL: 11,
};

export const SHAREPROVIDER: SharingBarProvider[] = [
    {
        id: SHAREOPTIONS.WHATSAPP,
        providerId: 1,
        name: 'txt_chayns_components_sharingbar_whatsapp',
        androidIdentifier: 'com.whatsapp',
        icon: 'fab fa-whatsapp',
        url: 'https://api.whatsapp.com/send?text={url}',
        available: true,
    },
    {
        id: SHAREOPTIONS.COPY,
        providerId: -1,
        name: 'txt_chayns_components_sharingbar_copy',
        androidIdentifier: null,
        icon: 'fa fa-copy',
        url: null,
        available: true,
    },
    {
        id: SHAREOPTIONS.MAIL,
        providerId: 0,
        name: 'txt_chayns_components_sharingbar_mail',
        androidIdentifier: null,
        icon: 'fa fa-envelope',
        url: 'mailto:?body={url}',
        available: true,
    },
    {
        id: SHAREOPTIONS.FACEBOOK,
        providerId: 2,
        name: 'txt_chayns_components_sharingbar_facebook',
        androidIdentifier: 'com.facebook.katana',
        icon: 'fab fa-facebook-f',
        url: 'http://www.facebook.com/dialog/share?app_id=472449496108149&display=page&href={url}&redirect_uri=http://facebook.com',
        available: true,
    },
    {
        id: SHAREOPTIONS.TWITTER,
        providerId: 5,
        name: 'txt_chayns_components_sharingbar_twitter',
        androidIdentifier: null,
        icon: 'fab fa-x-twitter',
        url: 'http://twitter.com/intent/tweet?text={linkText}&url={url}&hashtags=chayns',
        available: true,
    },
    {
        id: SHAREOPTIONS.QRCODE,
        providerId: 6,
        name: 'txt_chayns_components_sharingbar_qrcode',
        androidIdentifier: null,
        icon: 'fas fa-qrcode',
        url: 'https://cube.tobit.cloud/qr-code-generator/v1.0/png?value={url}&color={color}&text={linkText}',
        available: true,
    },
];
