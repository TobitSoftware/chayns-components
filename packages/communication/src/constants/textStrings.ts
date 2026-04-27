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
} as const;
