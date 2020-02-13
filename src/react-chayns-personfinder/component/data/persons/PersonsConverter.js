export const convertPerson = (relation) => {
    if ('siteId' in relation) return { type: 'SITE', ...relation };
    // due to inconsistent naming of the backends
    const fullName = relation.fullName || [relation.firstName, relation.lastName, relation.firstname, relation.lastname].join(' ').trim();
    return {
        type: 'PERSON',
        id: relation.personId,
        name: fullName,
        userId: relation.userId,
        personId: relation.personId,
        fullName,
        firstName: relation.firstName,
        lastName: relation.lastName,
        relations: relation.relations,
        relationCount: relation.relationCount,
        imageUrl: `https://sub60.tobit.com/u/${relation.personId}?size=50`,
    };
};

export const convertPersonForReturn = (person) => {
    const { id, name, ...other } = person;
    return other;
};

export const convertPersons = (persons) => {
    const unrelated = [];
    const related = [];

    persons.forEach((relation) => {
        const person = convertPerson(relation);
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
    type: 'PERSON',
    id: friend.personId,
    name: friend.fullName,
    userId: friend.userId,
    fullName: friend.fullName,
    firstName: friend.firstName,
    lastName: friend.lastName,
    personId: friend.personId,
    imageUrl: `https://sub60.tobit.com/u/${friend.personId}?size=40`,
});
