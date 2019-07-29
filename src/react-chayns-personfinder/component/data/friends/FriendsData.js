const CACHE_TIME = 10 * 1000;

class FriendsData {
    #friendsList = [];

    #friendsObject = {};

    #lastFetchTime = null;

    #activeFetch = null;

    constructor() {
        this.isFriend = this.isFriend.bind(this);
        this.getFriendsList = this.getFriendsList.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    isFriend(personId) {
        return this.#friendsObject[personId] || false;
    }

    getFriendsList() {
        return this.#friendsList;
    }

    #fetch = async () => {
        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            },
            mode: 'cors',
        };

        const response = await fetch('https://webapi.tobit.com/AccountService/v1.0/chayns/friends', config);

        if (response.status === 200) {
            this.#lastFetchTime = Date.now();
            return response.json();
        }

        return [];
    };

    /* eslint-disable-next-line no-unused-vars */
    async fetch(noCache = false) {
        if (!noCache && ((this.#lastFetchTime && this.#lastFetchTime + CACHE_TIME <= Date.now()) || this.#activeFetch)) {
            return this.#activeFetch;
        }

        this.#activeFetch = this.#fetch();
        const friendsList = await this.#activeFetch;

        this.#friendsList = friendsList;
        this.#friendsObject = {};
        this.#friendsList.forEach((e) => {
            this.#friendsObject[e.personId] = e;
        });

        return friendsList;
    }
}

export default new FriendsData();
