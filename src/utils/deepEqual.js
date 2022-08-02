/**
 * Compares if two objects are deeply equal
 * @param obj1
 * @param obj2
 * @returns {boolean|this is string[]}
 */
const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    if (!(typeof obj1 === 'object')) return false;
    if (!(typeof obj2 === 'object')) return false;

    if (obj1 === null) return false;
    if (obj2 === null) return false;

    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    return Object.keys(obj1).every((key) => deepEqual(obj1[key], obj2[key]));
}

export default deepEqual;
