
export const convertPersons = (persons) => {
    const unrelated = [];
    const related = [];

    persons.forEach((relation) => {
        const person = {
            id: relation.personId,
            personId: relation.personId,
            // due to inconsistent naming of the backends
            name: [relation.firstName, relation.lastName, relation.firstname, relation.lastname].join(' ').trim(),
            relations: relation.relations,
            relationCount: relation.relationCount,
            imageUrl: `https://sub60.tobit.com/u/${relation.personId}?size=50`,
        };
        if (!('score' in relation) || relation.score > 0) {
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
}));

export const convertFriend = friend => ({
    id: friend.personId,
    name: friend.fullName,
    personId: friend.personId,
    imageUrl: `https://sub60.tobit.com/u/${friend.personId}?size=40`,
});
