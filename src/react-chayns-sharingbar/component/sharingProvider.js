import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';

export const shareOptions = {
    COPY: 0,
    MAIL: 1,
    WHATSAPP: 2,
    FACEBOOK: 3,
    TWITTER: 5,
    CUSTOM_CHAYNS: 10,
    CUSTOM_ALL: 11,
};

export const shareProvider = [
    {
        id: shareOptions.WHATSAPP,
        providerId: 1,
        name: 'WhatsApp',
        androidIdentifier: 'com.whatsapp',
        icon: faWhatsapp,
        url: 'https://api.whatsapp.com/send?text={url}',
        available: true,
    },
    {
        id: shareOptions.COPY,
        providerId: -1,
        name: 'Zwischenablage',
        androidIdentifier: null,
        icon: faCopy,
        url: null,
        available: true,
    },
    {
        id: shareOptions.MAIL,
        providerId: 0,
        name: 'Mail',
        androidIdentifier: null,
        icon: faEnvelope,
        url: 'mailto:?body={url}',
        available: true,
    },
    {
        id: shareOptions.FACEBOOK,
        providerId: 2,
        name: 'Facebook',
        androidIdentifier: 'com.facebook.katana',
        icon: faFacebookF,
        url: 'http://www.facebook.com/dialog/share?app_id=472449496108149&display=page&href={url}&redirect_uri=http://facebook.com',
        available: true,
    },
    {
        id: shareOptions.TWITTER,
        providerId: 5,
        name: 'Twitter',
        androidIdentifier: null,
        icon: faTwitter,
        url: 'http://twitter.com/intent/tweet?text={linkText}&url={url}&hashtags=chayns',
        available: true,
    },
    {
        id: shareOptions.CUSTOM_CHAYNS,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: "far fa-share-alt",
        url: null,
        available: false,
    },
    {
        id: shareOptions.CUSTOM_ALL,
        providerId: -1,
        name: 'Share',
        androidIdentifier: null,
        icon: "far fa-share-alt",
        url: null,
        available: false,
    },
];
