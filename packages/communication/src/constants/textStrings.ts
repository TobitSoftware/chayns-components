export default {
    communicationHeader: {
        headerActions: {
            more: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationHeader_headerActions_more',
                fallback: 'Mehr',
            },
            read: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationHeader_headerActions_read',
                fallback: 'Als gelesen markieren',
            },
            teamTalk: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationHeader_headerActions_teamTalk',
                fallback: 'TeamTalk',
            },
            unread: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationHeader_headerActions_unread',
                fallback: 'Als ungelesen markieren',
            },
        },
        headerMembers: {
            cc: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationHeader_headerMembers_cc',
                fallback: 'Cc',
            },
            to: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationHeader_headerMembers_to',
                fallback: 'An',
            },
        },
    },
    communicationList: {
        sort: {
            older: {
                stringName: 'txt_chayns_components_v5_communication_communicationList_sort_older',
                fallback: 'Letzte 7 Tage',
            },
            today: {
                stringName: 'txt_chayns_components_v5_communication_communicationList_sort_today',
                fallback: 'Heute',
            },
            yesterday: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationList_sort_yesterday',
                fallback: 'Gestern',
            },
        },
    },
} as const;
