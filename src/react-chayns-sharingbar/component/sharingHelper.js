/* eslint-disable no-param-reassign,no-else-return */
import { shareProvider } from './sharingProvider';

export function getAvailableShareProviders() {
    if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
        return chayns.getAvailableSharingServices().then((response) => {
            const sharingApps = response.availableSharingApps;
            shareProvider.forEach((curProvider) => {
                if (curProvider.providerId < 0) {
                    return;
                }

                const shareApp = sharingApps.find(
                    (curApp) => curApp === curProvider.providerId
                );

                if (shareApp !== undefined) {
                    curProvider.available = true;
                    curProvider.useApp = true;
                }
            });

            if (chayns.env.isAndroid) {
                shareProvider[0].available = true;

                const androidApps = response.availableAndroidApps;

                shareProvider.forEach((curProvider) => {
                    if (!curProvider.androidIdentifier) {
                        return;
                    }

                    const shareApp = androidApps.find(
                        (curApp) => curApp === curProvider.androidIdentifier
                    );

                    if (shareApp) {
                        curProvider.available = true;
                        curProvider.useApp = true;
                    }
                });
            }

            if (
                (chayns.env.isIOS && chayns.env.appVersion >= 5182) ||
                (chayns.env.isAndroid && chayns.env.appVersion >= 5205)
            ) {
                shareProvider.find((app) => app.id === 10).available = true;
            }

            return Promise.resolve(shareProvider);
        });
    } else {
        if (!chayns.env.isIOS) {
            shareProvider[0].available = true;
        }

        const canShare =
            navigator.canShare &&
            navigator.canShare({
                text: 'text',
                url: 'https://www.chayns.net',
            });
        // check for edge is needed because the browser returns "true" for canShare(...) and throws an error on share(...)
        if (
            chayns.env.browser.name !== 'edge' &&
            canShare &&
            navigator.share &&
            !shareProvider.find((app) => app.id === 10).available
        ) {
            shareProvider.find((app) => app.id === 11).available = true;
        }
        return Promise.resolve(shareProvider);
    }
}

export function getDefaultShareLink() {
    let shareLink;
    if (chayns.env.isChaynsWeb) {
        shareLink = chayns.env.site.url.replace(
            /^(https:\/\/)(chayns.net\/[0-9]{5}-[0-9]{5})/,
            `$1${chayns.env.site.domain}`
        ); // replace chayns.net/{{siteId}} with domain
    } else {
        const tapp = chayns.env.site.tapps.find(
            (element) => element.id === chayns.env.site.tapp.id
        );

        shareLink = `http://${
            chayns.env.site.domain || `chayns.net/${chayns.env.site.id}`
        }/`;

        if (tapp) {
            shareLink += tapp.customUrl || `tapp/index/${tapp.id}`;
        } else {
            shareLink += `tapp/index/${chayns.env.site.tapp.id}`;
        }
    }

    const ignoreParams = ['v', 'deviceColorMode'];

    // eslint-disable-next-line no-restricted-syntax
    for (const ignoreParam of ignoreParams) {
        shareLink = shareLink.replace(
            new RegExp(`/(\\?.*)(${ignoreParam}(?:)[^&]*)/`),
            '$1'
        );
    }

    return shareLink;
}
