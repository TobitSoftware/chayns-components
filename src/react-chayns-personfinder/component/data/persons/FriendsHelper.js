import EventEmitter from '../../../../utils/events/EventEmitter';
import { fetchFriends, setFriend } from './PersonsApi';
import { convertFriend } from './PersonsConverter';

class FriendsHelper {
    #friends = [];

    #friendsObject = {};

    #eventEmitter = new EventEmitter();

    constructor() {
        this.#init();
    }

    #init = async () => {
        await window.chayns.ready;
        const raw = await fetchFriends().catch(() => []);
        this.#friends = raw.map(convertFriend);
        this.#friends.forEach((e) => {
            this.#friendsObject[e.personId] = e;
        });
        this.#eventEmitter.emit('update', this.#friends);
    };

    isFriend = personId => !!(this.#friendsObject[personId] || false);

    getFriendsList = () => this.#friends;

    setFriend = async (personId, fullName, friendship = true) => {
        const success = await setFriend(personId, friendship);
        if (!success) return;

        if (friendship) {
            const friend = convertFriend({
                personId,
                fullName,
            });
            this.#friends.push(friend);
            this.#friendsObject[personId] = friend;
        } else {
            this.#friends.splice(this.#friends.findIndex(person => person.personId === personId), 1);
            delete this.#friendsObject[personId];
        }
        this.#eventEmitter.emit('update', this.#friends);
    }

    addUpdateListener = (listener) => {
        this.#eventEmitter.on('update', listener);
    }

    removeUpdateListener = (listener) => {
        this.#eventEmitter.off('update', listener);
    }
}

export default new FriendsHelper();
