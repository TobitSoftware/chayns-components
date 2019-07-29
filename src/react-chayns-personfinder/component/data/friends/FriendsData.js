class FriendsData {
    #friendsList = [];

    #friendsObject = {};

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

    /* eslint-disable-next-line no-unused-vars */
    async fetch(noCache = false) {
        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            },
            mode: 'cors',
        };

        const response = await fetch('https://webapi.tobit.com/AccountService/v1.0/chayns/friends', config);

        if (response.status === 200) {
            const json = await response.json();

            this.#friendsList = json;
            this.#friendsObject = {};
            json.forEach((e) => {
                this.#friendsObject[e.personId] = e;
            });

            return json;
        }

        this.#friendsList = [];
        this.#friendsObject = {};

        return [];
    }
}

export default new FriendsData();
