export default {
    communicationHeader: {
        headerMembers: {
            to: {
                stringName: '',
                fallback: 'An',
            },
            cc: {
                stringName: '',
                fallback: 'Cc',
            },
        },
        headerActions: {
            read: {
                stringName: '',
                fallback: 'Als gelesen markieren',
            },
            unread: {
                stringName: '',
                fallback: 'Als ungelesen markieren',
            },
            teamTalk: {
                stringName: '',
                fallback: 'TeamTalk',
            },
            more: {
                stringName: '',
                fallback: 'Mehr',
            },
        },
    },
    communicationList: {
        sort: {
            today: {
                stringName: '',
                fallback: 'Heute',
            },
            yesterday: {
                stringName: '',
                fallback: 'Gestern',
            },
            older: {
                stringName: '',
                fallback: 'Letzte 7 Tage',
            },
        },
    },
} as const;
