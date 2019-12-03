
export const fetchUsers = async (value, skip = 0, take = 20) => {
    let result;
    const response = await fetch(`https://chayns2.tobit.com/SiteSearchApi/location/search/${value}/?skip=${skip}&take=${take}`, {
        method: 'GET',
    });

    if (response.ok) {
        result = await response.json().catch(() => []);
    } else {
        console.error('req failed', response.status);
    }
    return result;
};
