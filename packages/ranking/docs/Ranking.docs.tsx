import React, { FC } from 'react';
import { Ranking, RankingEntry } from '@chayns-components/ranking';

const Component: FC = () => {
    const entries: RankingEntry[] = [
        {
            rank: 1,
            name: 'Michael Gesenhues',
            personId: 'MIC-HAEL1',
            points: 12,
            content: [
                {
                    id: '12345-54321',
                    name: 'Richtiges Ergebnis',
                    value: '4',
                },
            ],
        },
        {
            rank: 2,
            name: 'Jannik Weise',
            personId: 'JAN-NIK96',
            points: 11,
            content: [
                {
                    id: '12345-54321',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
            ],
        },
    ];

    const friendPersonIds = ['JAN-NIK96'];

    return <Ranking entries={entries} friendPersonIds={friendPersonIds} />;
};

Component.displayName = 'Component';

export default Component;
