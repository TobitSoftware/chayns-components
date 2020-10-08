let tobitEmployee = null;

/**
 * Requests an endpoint to get the information if the user is a Tobit.Software employee.
 * @returns {Promise<>} - Promise is resolved when user is a Tobit.Software employee.
 */
export default function isTobitEmployee() {
    return new Promise((resolve, reject) => {
        if (tobitEmployee === true) {
            resolve();
        } else if (
            tobitEmployee === false ||
            !chayns.env.user.isAuthenticated
        ) {
            reject();
        } else {
            fetch(
                `https://chaynssvc.tobit.com/v0.5/${chayns.env.site.locationId}/user/UAC/8255`,
                {
                    headers: {
                        Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
                    },
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        response
                            .json()
                            .then((json) => {
                                if (json.data) {
                                    json.data.forEach((item) => {
                                        if (item.locationId === 1214) {
                                            tobitEmployee = true;
                                            resolve();
                                        }
                                    });
                                }
                                if (!tobitEmployee) {
                                    tobitEmployee = false;
                                    reject();
                                }
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    } else {
                        tobitEmployee = false;
                        reject(response.statusText);
                    }
                })
                .catch(reject);
        }
    });
}
