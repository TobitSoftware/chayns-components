
export const convertPersons = (persons) => {
    const unrelated = [];
    const related = [];

    persons.forEach((relation) => {
        const person = {
            id: relation.personId,
            name: relation.lastName && relation.firstName ? `${relation.firstName} ${relation.lastName}` : relation.lastName || relation.firstName,
            imageUrl: `https://sub60.tobit.com/u/${relation.personId}?size=50`,
        };
        if (relation.score > 0) {
            related.push(person);
        } else {
            unrelated.push(person);
        }
    });

    return {
        personsUnrelated: unrelated,
        personsRelated: related,
    };
};

export const convertSites = sites => sites.map(site => ({
    id: site.siteId,
    name: site.locationName,
    imageUrl: `https://sub60.tobit.com/l/${site.siteId}?size=40`,
}))

export const convertFriends = friends => friends.map(friend => ({
    id: friend.personId,
    name: friend.fullName,
    personId: friend.personId,
    imageUrl: `https://sub60.tobit.com/u/${friend.personId}?size=40`,
}));
