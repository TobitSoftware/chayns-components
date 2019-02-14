export function convertToInputValue(data) {
    let value = '';

    if (data.name) {
        value += `${data.name}`;
    } else if (data.firstName && data.lastName) {
        value += `${data.firstName} ${data.lastName}`;
    } else if (data.firstName || data.lastName) {
        if (data.firstName) {
            value += `${data.firstName}`;
        }

        if (data.lastName) {
            value += `${data.lastName}`;
        }
    }

    if (data.siteId || data.personId) {
        const addBrackets = !!value;

        if (addBrackets) value += ' (';

        if (data.siteId) {
            value += `${data.siteId}`;
        } else {
            value += `${data.personId}`;
        }

        if (addBrackets) value += ')';
    }

    return value;
}

export function createInputValue(data) {
    if (chayns.utils.isString(data)) {
        return data;
    }

    if (!chayns.utils.isObject(data) || chayns.utils.isArray(data)) {
        return data;
    }

    if (!data.name && !data.firstName && !data.lastName && !data.siteId && !data.personId) {
        return '';
    }

    return convertToInputValue(data);
}
