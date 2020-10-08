import FriendsHelper from './FriendsHelper';

export const convertPerson = (relation) => {
    if ('siteId' in relation) return { type: 'SITE', ...relation };
    // due to inconsistent naming of the backends
    const fullName =
        relation.fullName ||
        relation.name ||
        relation.UserFullName ||
        [
            relation.firstName || relation.firstname,
            relation.lastName || relation.lastname,
        ]
            .join(' ')
            .trim();

    return {
        type: 'PERSON',
        id: relation.personId || relation.PersonID,
        name: fullName,
        userId: relation.userId || relation.UserID,
        personId: relation.personId || relation.PersonID,
        fullName,
        firstName:
            relation.firstName || relation.firstname || relation.FirstName,
        lastName: relation.lastName || relation.lastname || relation.LastName,
        relations: relation.relations,
        relationCount: relation.relationCount,
        imageUrl: `https://sub60.tobit.com/u/${
            relation.personId || relation.PersonID
        }?size=50`,
        isFriend: FriendsHelper.isFriend(
            relation.personId || relation.PersonID
        ),
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

export const convertSites = (sites) =>
    sites.map((site) => ({
        type: 'SITE',
        id: site.siteId,
        name: site.locationName,
        imageUrl: `https://sub60.tobit.com/l/${site.siteId}?size=40`,
        siteId: site.siteId,
        locationId: site.locationId,
    }));
