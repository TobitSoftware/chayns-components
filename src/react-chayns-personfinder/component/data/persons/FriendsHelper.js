import EventEmitter from '../../../../utils/events/EventEmitter';
import { fetchFriends, setFriend } from './PersonsApi';

class FriendsHelper {
    static #friends = [];

    static #friendsObject = {};

    static #eventEmitter = new EventEmitter();

    static init = async () => {
        await window.chayns.ready;
        if (window.chayns.env.user && window.chayns.env.user.isAuthenticated) {
            const raw = await fetchFriends().catch(() => []);
            FriendsHelper.#friends = raw.map(FriendsHelper.convertFriend);
            FriendsHelper.#friends.forEach((e) => {
                FriendsHelper.#friendsObject[e.personId] = e;
            });
            FriendsHelper.#eventEmitter.emit('update', FriendsHelper.#friends);
        }
    };

    static isFriend = (personId) => !!(FriendsHelper.#friendsObject[personId] || false);

    static getFriendsList = () => FriendsHelper.#friends;

    static setFriend = async (personId, fullName, friendship = true) => {
        const success = await setFriend(personId, friendship);
        if (!success) return;

        if (friendship) {
            const friend = FriendsHelper.convertFriend({
                personId,
                fullName,
            });
            FriendsHelper.#friends.push(friend);
            FriendsHelper.#friendsObject[personId] = friend;
        } else {
            FriendsHelper.#friends.splice(FriendsHelper.#friends.findIndex((person) => person.personId === personId), 1);
            delete FriendsHelper.#friendsObject[personId];
        }
        FriendsHelper.#eventEmitter.emit('update', FriendsHelper.#friends);
    };

    static addUpdateListener = (listener) => {
        FriendsHelper.#eventEmitter.on('update', listener);
    };

    static removeUpdateListener = (listener) => {
        FriendsHelper.#eventEmitter.off('update', listener);
    };

    static convertFriend = (friend) => ({
        type: 'PERSON',
        id: friend.personId,
        name: friend.fullName,
        userId: friend.userId,
        fullName: friend.fullName,
        firstName: friend.firstName,
        lastName: friend.lastName,
        personId: friend.personId,
        imageUrl: `https://sub60.tobit.com/u/${friend.personId}?size=40`,
        isFriend: true,
    });
}

FriendsHelper.init();

export default FriendsHelper;
