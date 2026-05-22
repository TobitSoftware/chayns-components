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
    communicationMessage: {
        agreeMessage: {
            text: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationMessage_agreeMessage_text',
                fallback: 'Stimme zu.',
            },
        },
        dateMessage: {
            today: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationMessage_dateMessage_today',
                fallback: 'Heute',
            },
            yesterday: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationMessage_dateMessage_yesterday',
                fallback: 'Gestern',
            },
        },
        textMessage: {
            delete: {
                stringName:
                    'txt_chayns_components_v5_communication_communicationMessage_textMessage_delete',
                fallback: 'Diese Nachricht wurde gelöscht.',
            },
        },
    },
    previewMessage: {
        file: {
            stringName: '',
            fallback: 'Datei',
        },
        image: {
            stringName: '',
            fallback: 'Bild',
        },
        video: {
            stringName: '',
            fallback: 'Video',
        },
        plugin: {
            stringName: '',
            fallback: 'Plugin',
        },
    },
    socialPlugin: {
        bar: {
            like: {
                stringName: '',
                fallback: 'Gefällt mir',
            },
            comment: {
                stringName: '',
                fallback: 'Kommentieren',
            },
        },
        content: {
            input: {
                placeholder: {
                    stringName: '',
                    fallback: 'Kommentieren',
                },
            },
        },
    },
    CommunicationTeamTalkHeader: {
        add: {
            stringName: 'txt_chayns_components_v5_communication_CommunicationTeamTalkHeader_add',
            fallback: 'Personen hinzufügen',
        },
        agree: {
            stringName: 'txt_chayns_components_v5_communication_CommunicationTeamTalkHeader_agree',
            fallback: 'Stimme zu',
        },
        hint: {
            heading: {
                stringName:
                    'txt_chayns_components_v5_communication_CommunicationTeamTalkHeader_hint_heading',
                fallback: 'Externe Nachricht',
            },
            text: {
                stringName:
                    'txt_chayns_components_v5_communication_CommunicationTeamTalkHeader_hint_text',
                fallback: 'TeamTalk ist nur intern sichtbar',
            },
        },
        leave: {
            stringName: 'txt_chayns_components_v5_communication_CommunicationTeamTalkHeader_leave',
            fallback: 'Verlassen',
        },
    },
} as const;
