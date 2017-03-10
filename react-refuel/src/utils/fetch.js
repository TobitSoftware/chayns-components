/**
 * This is an example that simulates an API call. Make sure to remove this function and call your own APIs instead.
 * @returns {Promise}
 */
export function fetchDataFromApi(url, method, data, statusCodes) {
    /* Allow urls for sending Authorization Informations */
    let allowedUrls = [
        "tobit.com",
        "chayns.net",
        'tappqa.tobit.com',
        'tapp01.tobit.com'
    ];

    /* Allow custom status codes (always allowed: 200) */
    if(statusCodes == undefined || !Array.isArray(statusCodes)) {
        statusCodes = [];
    }

    return new Promise((resolve, reject) => {

        let request;

        if(method == undefined || method === null || method === 'GET') {
            request = {
                'headers': {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                'method': 'GET'
            };
        } else {
            request = {
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                'method': method
            };

            if(data) {
                request.body = JSON.stringify(data);
            }
        }

        if(window.chayns.env.user.isAuthenticated && allowedUrls.indexOf( extractDomain(url) ) !== -1) {
            request.headers.authorization = `bearer ${window.chayns.env.user.tobitAccessToken}`;
        }

        window.fetch(url, request).then((data) => {
            if (data.status === 200 || statusCodes.indexOf(data.status) != -1) {
                return data.text().then((data) => { // catch empty response
                    if (data != undefined && data != null && data != '') {
                        return JSON.parse(data);
                    }

                    return data;
                });
            } else {
                let BadStatusError = function (message) {
                    return ({
                        name: 'BadStatusError',
                        message: message || 'Unknown Status',
                        stack: (new Error()).stack
                    });
                };

                reject(BadStatusError('Bad Status Code: ' + data.status));    // send own error

            }
        }).then((json) => {
            resolve(json);
        }).catch((error) => {
            reject(error);
        });
    });
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

export function reloadCache(reload) {
    window.extendedWaitCursor.showWaitCursor('reload_cache');

    return new Promise((resolve, reject) => {

        fetchDataFromApi(`##server_url##/cache/${window.chayns.env.site.locationId}`, 'GET', null).then(function (data) {
            if(data != true) {
                window.chayns.dialog.alert(window.chayns.utils.lang.get('txt_shopMashup_reloadCache'), window.chayns.utils.lang.get('txt_shopMashup_reloadCacheWarning'));
                reject();
            } else {
                resolve();

                if(reload !== false) {
                    window.location.reload();
                }
            }
        }).catch(function (error) {
            console.warn(error);
            window.chayns.dialog.alert(window.chayns.utils.lang.get('txt_shopMashup_reloadCache'), window.chayns.utils.lang.get('txt_shopMashup_reloadCacheWarning'));
            reject();
        }).then(() => {
            window.extendedWaitCursor.hideWaitCursor('reload_cache');
        });

    });
}