import {
    faFacebookF, faWhatsapp, faGooglePlusG, faTwitter, faTumblr, faTelegram, faSkype
} from '@fortawesome/free-brands-svg-icons';
import { faCopy, faEnvelope, faShare } from '@fortawesome/free-regular-svg-icons';

export const shareProvider = [
    {
        id: 0,
        providerId: -1,
        name: 'Zwischenablage',
        androidIdentifier: null,
        icon: faCopy,
        action: 0,
        url: null,
        available: false
    },
    {
        id: 1,
        providerId: 0,
        name: 'Mail',
        androidIdentifier: null,
        icon: faEnvelope,
        action: 2,
        url: null,
        available: false
    },
    {
        id: 2,
        providerId: 1,
        name: 'WhatsApp',
        androidIdentifier: 'com.whatsapp',
        icon: faWhatsapp,
        action: 1,
        url: null,
        available: false
    },
    {
        id: 3,
        providerId: 2,
        name: 'Facebook',
        androidIdentifier: 'com.facebook.katana',
        icon: faFacebookF,
        action: 1,
        url: 'http://www.facebook.com/dialog/share?app_id=472449496108149&display=page&href={url}&redirect_uri=http://facebook.com',
        available: true
    },
    {
        id: 4,
        providerId: 4,
        name: 'GooglePlus',
        androidIdentifier: 'com.google.android.apps.plus',
        icon: faGooglePlusG,
        action: 1,
        url: 'http://plus.google.com/share?url={url}',
        available: true
    },
    {
        id: 5,
        providerId: 5,
        name: 'Twitter',
        androidIdentifier: null,
        icon: faTwitter,
        action: 1,
        url: 'http://twitter.com/intent/tweet?text=&url={url}&hashtags=chayns',
        available: true
    },
    {
        id: 6,
        providerId: -1,
        name: 'Tumblr',
        androidIdentifier: 'com.tumblr',
        icon: faTumblr,
        action: 1,
        url: '//tumblr.com/widgets/share/tool?canonicalUrl={url}',
        available: false
    },
    {
        id: 7,
        providerId: -1,
        name: 'Telegram',
        androidIdentifier: 'org.telegram.messenger',
        icon: faTelegram,
        action: 1,
        url: null,
        available: false
    },
    /*    {
            'id': 8,
            'providerId': -1,
            'name': 'Snapchat',
            'androidIdentifier': 'com.snapchat.android',
            'icon': 'fa-snapchat-ghost',
            'action': 2,
            'url': null,
            'available': false
        }, */
    {
        id: 9,
        providerId: -1,
        name: 'Skype',
        androidIdentifier: 'com.skype.raider',
        icon: faSkype,
        action: 2,
        url: null,
        available: false
    },
    {
        id: 10,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: faShare,
        action: 2,
        url: null,
        available: false
    }

];

export const shareActions = {
    copyToClipboard: 0,
    shareWithUrl: 1,
    shareWithApp: 2
};
