let userInfo = null;

export default async function getCurrentUserInformation() {
    const { personId: userPersonId } = chayns.env.user;

    if (!userPersonId) {
        return null;
    }

    if (!userInfo || (await userInfo).personId !== userPersonId) {
        userInfo = chayns.getUser({
            personId: userPersonId,
        }).then(({
            FirstName: firstName,
            LastName: lastName,
            PersonID: personId,
            UserID: userId,
        } = {}) => ({
            firstName,
            lastName,
            personId,
            userId,
        }));
    }

    return userInfo;
}
