function extractDomain(url) {
    let domain;
    // find & remove protocol (http, ftp, etc.) and get domain
    if(url.indexOf('://') > -1) {
        // eslint-disable-next-line prefer-destructuring
        domain = url.split('/')[2];
    } else {
        // eslint-disable-next-line prefer-destructuring
        domain = url.split('/')[0];
    }

    // find & remove port number
    // eslint-disable-next-line prefer-destructuring
    domain = domain.split(':')[0];

    return domain;
}

/**
 * This is an example that simulates an API call. Make sure to remove this function and call your own APIs instead.
 * @returns {Promise}
 */
export function fetchDataFromApi(url, method = 'GET', body, statusCodes) {
    /* Allow urls for sending Authorization Informations */
    const allowedUrls = [
        'tobit.com',
        'chayns.net',
        'tappqa.tobit.com',
        'tapp01.tobit.com'
    ];

    let allowedStatusCodes = statusCodes;

    /* Allow custom status codes (always allowed: 200) */
    if(allowedStatusCodes === undefined || !Array.isArray(allowedStatusCodes)) {
        allowedStatusCodes = [];
    }

    let request;

    if(method === undefined || method === null || method === 'GET') {
        request = {
            headers: {
                Accept: 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
                Expires: '0'
            },
            method: 'GET'
        };
    } else {
        request = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method
        };

        if(body) {
            request.body = JSON.stringify(body);
        }
    }

    if(window.chayns.env.user.isAuthenticated && allowedUrls.indexOf(extractDomain(url)) !== -1) {
        request.headers.authorization = `bearer ${window.chayns.env.user.tobitAccessToken}`;
    }

    return window.fetch(url, request).then((response) => {
        if(response.status === 200 || allowedStatusCodes.indexOf(response.status) !== -1) {
            return response.text().then((data) => { // catch empty response
                if(data !== undefined && data !== null && data !== '') {
                    return JSON.parse(data);
                }

                return data;
            });
        }

        const BadStatusError = (message) => {
            return ({
                name: 'BadStatusError',
                message: message || 'Unknown Status',
                stack: (new Error()).stack
            });
        };

        throw BadStatusError(`Bad Status Code: ${response.status}`); // send own error
    });
}

export function reloadCache(reload) {
    window.extendedWaitCursor.showWaitCursor('reload_cache');

    return new Promise((resolve, reject) => {
        fetchDataFromApi(`##server_url##/cache/${window.chayns.env.site.locationId}`, 'GET', null).then((data) => {
            if(data !== true) {
                window.chayns.dialog.alert(window.chayns.utils.lang.get('txt_shopMashup_reloadCache'), window.chayns.utils.lang.get('txt_shopMashup_reloadCacheWarning'));
                reject();
            } else {
                resolve();

                if(reload !== false) {
                    window.location.reload();
                }
            }
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error);
            window.chayns.dialog.alert(window.chayns.utils.lang.get('txt_shopMashup_reloadCache'), window.chayns.utils.lang.get('txt_shopMashup_reloadCacheWarning'));
            reject();
        }).then(() => {
            window.extendedWaitCursor.hideWaitCursor('reload_cache');
        });
    });
}
