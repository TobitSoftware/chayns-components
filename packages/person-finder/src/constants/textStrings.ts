export const PERSON_FINDER_TEXTSTRING_LIBRARY_NAME = '@chayns-components-person-finder';

export default {
    components: {
        personFinder: {
            wrapper: {
                body: {
                    group: {
                        loadMore: {
                            stringName:
                                'txt_chayns_components_person_finder_components_personFinder_wrapper_body_group_loadMore',
                            fallback: 'Mehr',
                        },
                        errorMessage: {
                            minSearchLength: {
                                stringName:
                                    'txt_chayns_components_person_finder_components_personFinder_wrapper_body_group_errorMessage_minSearchLength',
                                fallback: 'Gib einen Suchbegriff mit mindestens drei Zeichen ein.',
                            },
                            noResults: {
                                stringName:
                                    'txt_chayns_components_person_finder_components_personFinder_wrapper_body_group_errorMessage_noResults',
                                fallback:
                                    'Es konnten keine ##groupName## zu der Suche "##search##" gefunden werden.',
                            },
                            emptySearch: {
                                stringName:
                                    'txt_chayns_components_person_finder_components_personFinder_wrapper_body_group_errorMessage_emptySearch',
                                fallback:
                                    'Gib einen Suchbegriff ein, um nach ##groupName## zu suchen.',
                            },
                        },
                    },
                },
                item: {
                    chaynsId: {
                        stringName:
                            'txt_chayns_components_person_finder_components_personFinder_wrapper_item_chaynsId',
                        fallback: 'chaynsID: ##id##',
                    },
                    commonSites: {
                        stringName:
                            'txt_chayns_components_person_finder_components_personFinder_wrapper_item_commonSites',
                        fallback: '##count## gemeinsame Sites',
                    },
                },
            },
            groupName: {
                person: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_groupName_person',
                    fallback: 'Personen',
                },
                site: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_groupName_site',
                    fallback: 'Sites',
                },
                uac: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_groupName_uac',
                    fallback: 'UAC Gruppen',
                },
            },
            lastOnline: {
                fewMinutes: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_fewMinutes',
                    fallback: 'zul. online vor wenigen Minuten',
                },
                minutes: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_minutes',
                    fallback: 'zul. online vor ##minutes## Minuten',
                },
                today: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_today',
                    fallback: 'zul. online heute um ##time## Uhr',
                },
                yesterday: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_yesterday',
                    fallback: 'zul. online gestern um ##time## Uhr',
                },
                days: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_days',
                    fallback: 'zul. online vor ##days## Tagen',
                },
                months: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_months',
                    fallback: 'zul. online vor ##months## Monaten',
                },
                years: {
                    stringName:
                        'txt_chayns_components_person_finder_components_personFinder_lastOnline_years',
                    fallback: 'zul. online vor ##years## Jahren',
                },
            },
        },
    },
} as const;
