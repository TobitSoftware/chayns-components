import React, { useContext } from 'react';
import {
    PersonEntry,
    PersonFinderContextValue,
    PersonFinderEntry,
    SiteEntry,
    UACEntry,
} from './PersonFinder.types';
import textStrings from '../../constants/textStrings';
import { VerificationBadge } from '@chayns-components/core';
import {
    formatLastOnline,
    getPersonFinderTextstringValue,
    isSiteEntry,
} from './PersonFinder.utils';
import { PersonFinderContext } from './PersonFinder.context';

export const usePersonFinderItem = (entry: PersonFinderEntry) => {
    const isSite = isSiteEntry(entry as PersonEntry | SiteEntry);
    const ts = textStrings.components.personFinder;

    const { url, commonSites, name, firstName, lastName, id, isVerified, lastOnlineTime } =
        entry as PersonEntry & SiteEntry;

    const imageUrl = `https://sub60.tobit.com/${isSite ? 'l' : 'u'}/${id as string}?size=120`;
    const titleElement = isVerified && <VerificationBadge />;
    const title = isSite ? name : `${(firstName as string) ?? ''} ${(lastName as string) ?? ''}`;

    let subtitle = getPersonFinderTextstringValue({
        textstring: ts.wrapper.item.chaynsId,
        replacements: { id: id as string },
    });

    if (lastOnlineTime) {
        subtitle += ` - ${formatLastOnline(new Date(lastOnlineTime))}`;
    } else if (commonSites) {
        subtitle += ` - ${getPersonFinderTextstringValue({
            textstring: ts.wrapper.item.commonSites,
            replacements: { count: commonSites as number },
        })}`;
    }

    if (isSite) {
        subtitle = url;
    }

    return {
        isSite,
        title,
        subtitle,
        imageUrl,
        titleElement,
    };
};
export const usePersonFinderSmallItem = (entry: PersonFinderEntry) => {
    const { name } = entry as UACEntry;

    return {
        title: name,
    };
};
export const usePersonFinder = (): PersonFinderContextValue => {
    const context = useContext(PersonFinderContext);

    if (!context) {
        throw new Error('usePersonFinder must be used within PersonFinderProvider.');
    }

    return context;
};

export const useFriends = (personId: string) => {
    const { friends, removeFriend, addFriend } = usePersonFinder();

    const isFriend = friends?.map((entry) => entry.id).includes(personId);

    return {
        isFriend,
        addFriend,
        removeFriend,
    };
};
