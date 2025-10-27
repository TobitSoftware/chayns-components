import React, { FC, useState } from 'react';
import {
    Input,
    MentionFinder,
    MentionMember,
    MentionFinderPopupAlignment,
} from '@chayns-components/core';

const MEMBERS: MentionMember[] = [
    {
        id: 'JAN-NIK96',
        imageUrl: 'https://sub60.tobit.com/u/JAN-NIK96',
        name: 'Jannik Weise',
        shouldShowRoundImage: true,
    },
    {
        id: 'MIC-HAEL1',
        imageUrl: 'https://sub60.tobit.com/u/MIC-HAEL1',
        name: 'JMichael Gesenhues',
        shouldShowRoundImage: true,
    },
];

const Component: FC = () => {
    const [value, setValue] = useState('');

    const handleSelect = ({ fullMatch, member }: { fullMatch: string; member: MentionMember }) => {
        console.log('MentionFinder:', { fullMatch, member });
    };

    return (
        <>
            <Input value={value} onChange={(event) => setValue(event.target.value)} />
            <MentionFinder
                inputValue={value}
                members={MEMBERS}
                onSelect={handleSelect}
                popupAlignment={MentionFinderPopupAlignment.Bottom}
            />
        </>
    );
};

Component.displayName = 'Component';

export default Component;
