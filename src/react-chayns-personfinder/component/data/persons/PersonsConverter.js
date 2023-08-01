import FriendsHelper from './FriendsHelper';

export const convertPerson = (relation) => {
    if ('siteId' in relation) return { type: 'SITE', ...relation };
    if ('type' in relation && relation.type === 'GROUP')
        return { type: 'GROUP', ...relation };
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
        personId: relation.personId || relation.PersonID,
        fullName,
        firstName:
            relation.firstName || relation.firstname || relation.FirstName,
        lastName: relation.lastName || relation.lastname || relation.LastName,
        relations: relation.relations,
        relationCount: relation.relationCount,
        imageUrl: `https://sub60.tobit.com/u/${
            relation.personId || relation.PersonID
        }?size=100`,
        isFriend: FriendsHelper.isFriend(
            relation.personId || relation.PersonID
        ),
        verificationState: !!relation.verificationState,
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

export const convertUacPersons = (persons) => persons.map(convertPerson);

export const convertSites = (sites) =>
    sites.map((site) => ({
        type: 'SITE',
        id: site.siteId,
        name: site.name,
        imageUrl: `https://sub60.tobit.com/l/${site.siteId}?size=100`,
        siteId: site.siteId,
        locationId: site.locationId,
    }));

export const convertKnownPerson = (knownPersons) =>
    knownPersons.map((person) => ({
        type: 'KNOWN_PERSON',
        id: person.personId,
        name: [person.firstname, person.lastname].join(' ').trim(),
        personId: person.personId,
        fullName: [person.firstname, person.lastname].join(' ').trim(),
        firstName: person.firstname,
        lastName: person.lastname,
        imageUrl: `https://sub60.tobit.com/u/${person.personId}?size=100`,
    }));
