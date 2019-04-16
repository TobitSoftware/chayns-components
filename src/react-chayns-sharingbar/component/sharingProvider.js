import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faTumblr } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faSkype } from '@fortawesome/free-brands-svg-icons/faSkype';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';

export const shareProvider = [
    {
        id: 0,
        providerId: -1,
        name: 'Zwischenablage',
        androidIdentifier: null,
        icon: faLink,
        action: 0,
        url: null,
        available: false,
    },
    {
        id: 1,
        providerId: 0,
        name: 'Mail',
        androidIdentifier: null,
        icon: faEnvelope,
        action: 2,
        url: null,
        available: false,
    },
    {
        id: 2,
        providerId: 1,
        name: 'WhatsApp',
        androidIdentifier: 'com.whatsapp',
        icon: faWhatsapp,
        action: 1,
        url: null,
        available: false,
    },
    {
        id: 3,
        providerId: 2,
        name: 'Facebook',
        androidIdentifier: 'com.facebook.katana',
        icon: faFacebookF,
        action: 1,
        url: 'http://www.facebook.com/dialog/share?app_id=472449496108149&display=page&href={url}&redirect_uri=http://facebook.com',
        available: true,
    },
    {
        id: 5,
        providerId: 5,
        name: 'Twitter',
        androidIdentifier: null,
        icon: faTwitter,
        action: 1,
        url: 'http://twitter.com/intent/tweet?text=&url={url}&hashtags=chayns',
        available: true,
    },
    {
        id: 6,
        providerId: -1,
        name: 'Tumblr',
        androidIdentifier: 'com.tumblr',
        icon: faTumblr,
        action: 1,
        url: '//tumblr.com/widgets/share/tool?canonicalUrl={url}',
        available: false,
    },
    {
        id: 7,
        providerId: -1,
        name: 'Telegram',
        androidIdentifier: 'org.telegram.messenger',
        icon: faTelegram,
        action: 1,
        url: null,
        available: false,
    },
    /*    {
            'id': 8,
            'providerId': -1,
            'name': 'Snapchat',
            'androidIdentifier': 'com.snapchat.android',
            'icon': 'fa-snapchat-ghost',
            'action': 2,
            'url': null,
            'available': false,
        }, */
    {
        id: 9,
        providerId: -1,
        name: 'Skype',
        androidIdentifier: 'com.skype.raider',
        icon: faSkype,
        action: 2,
        url: null,
        available: false,
    },
    {
        id: 10,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: faShareAlt,
        action: 2,
        url: null,
        available: false,
    },
    {
        id: 11,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: faShareAlt,
        action: 3,
        url: null,
        available: false,
    },

];

export const shareActions = {
    copyToClipboard: 0,
    shareWithUrl: 1,
    shareWithApp: 2,
    webShareApi: 3,
};
