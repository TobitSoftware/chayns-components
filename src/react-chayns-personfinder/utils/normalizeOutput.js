export default function normalizeOutput(type, value) {
    return {
        type,
        name: value.name,
        firstName: value.firstName,
        lastName: value.lastName,
        personId: value.personId,
        userId: value.userId,
        siteId: value.siteId,
        locationId: value.locationId,
        isFriend: value.isFriend,
    };
}
