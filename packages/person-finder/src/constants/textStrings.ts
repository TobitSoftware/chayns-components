export default {
    components: {
        personFinder: {
            groupName: {
                person: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_groupName_person',
                    fallback: 'Personen',
                },
                site: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_groupName_site',
                    fallback: 'Sites',
                },
                uac: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_groupName_uac',
                    fallback: 'UAC Gruppen',
                },
            },
            lastOnline: {
                days: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_days',
                    fallback: 'zul. online vor ##days## Tagen',
                },
                fewMinutes: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_fewMinutes',
                    fallback: 'zul. online vor wenigen Minuten',
                },
                minutes: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_minutes',
                    fallback: 'zul. online vor ##minutes## Minuten',
                },
                months: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_months',
                    fallback: 'zul. online vor ##months## Monaten',
                },
                today: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_today',
                    fallback: 'zul. online heute um ##time## Uhr',
                },
                years: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_years',
                    fallback: 'zul. online vor ##years## Jahren',
                },
                yesterday: {
                    stringName:
                        'txt_chayns_components_v5_person_finder_components_personFinder_lastOnline_yesterday',
                    fallback: 'zul. online gestern um ##time## Uhr',
                },
            },
            wrapper: {
                body: {
                    group: {
                        errorMessage: {
                            emptySearch: {
                                stringName:
                                    'txt_chayns_components_v5_person_finder_components_personFinder_wrapper_body_group_errorMessage_emptySearch',
                                fallback:
                                    'Gib einen Suchbegriff ein, um nach ##groupName## zu suchen.',
                            },
                            minSearchLength: {
                                stringName:
                                    'txt_chayns_components_v5_person_finder_components_personFinder_wrapper_body_group_errorMessage_minSearchLength',
                                fallback: 'Gib einen Suchbegriff mit mindestens drei Zeichen ein.',
                            },
                            noResults: {
                                stringName:
                                    'txt_chayns_components_v5_person_finder_components_personFinder_wrapper_body_group_errorMessage_noResults',
                                fallback:
                                    'Es konnten keine ##groupName## zu der Suche "##search##" gefunden werden.',
                            },
                        },
                        loadMore: {
                            stringName:
                                'txt_chayns_components_v5_person_finder_components_personFinder_wrapper_body_group_loadMore',
                            fallback: 'Mehr',
                        },
                    },
                },
                item: {
                    chaynsId: {
                        stringName:
                            'txt_chayns_components_v5_person_finder_components_personFinder_wrapper_item_chaynsId',
                        fallback: 'chaynsID: ##id##',
                    },
                    commonSites: {
                        stringName:
                            'txt_chayns_components_v5_person_finder_components_personFinder_wrapper_item_commonSites',
                        fallback: '##count## gemeinsame Sites',
                    },
                },
            },
        },
    },
} as const;
