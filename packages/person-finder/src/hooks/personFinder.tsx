import React, { RefObject, useEffect, useMemo, useState } from 'react';
import {
    LoadingState,
    PersonEntry,
    PersonFinderEntry,
    SiteEntry,
    UACEntry,
} from '../types/personFinder';
import {
    formatLastOnline,
    getPersonFinderTextstringValue,
    isSiteEntry,
} from '../utils/personFinder';
import { VerificationBadge } from '@chayns-components/core';
import { usePersonFinder } from '../components/PersonFinderProvider';
import { StyledPersonFinderGroupErrorMessage } from '../components/person-finder/person-finder-wrapper/person-finder-body/person-finder-group/PersonFinderGroup.styles';
import textStrings from '../constants/textStrings';

export const useClosestElementAbove = (containerRef: RefObject<HTMLElement>, itemClass: string) => {
    const [closestElement, setClosestElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const updateClosestElement = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const items = Array.from(container.getElementsByClassName(itemClass)) as HTMLElement[];
            const containerRect = container.getBoundingClientRect();

            let closest: HTMLElement | null = null;
            let minDistance = Infinity;

            items.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const distance = Math.abs(rect.bottom - containerRect.top);

                if (rect.bottom < containerRect.top && distance < minDistance) {
                    minDistance = distance;
                    closest = item;
                }
            });

            setClosestElement(closest);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', updateClosestElement);
            updateClosestElement();
        }

        return () => {
            container?.removeEventListener('scroll', updateClosestElement);
        };
    }, [containerRef, itemClass]);

    return closestElement?.textContent;
};

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

export const useFriends = (personId: string) => {
    const { friends, removeFriend, addFriend } = usePersonFinder();

    const isFriend = friends?.map((entry) => entry.id).includes(personId);

    return {
        isFriend,
        addFriend,
        removeFriend,
    };
};

export const useOnlyFriends = (entries: PersonFinderEntry[]) => {
    const { friends } = usePersonFinder();

    return useMemo(() => {
        if (!entries?.length) return false;
        if (!friends?.length) return false;

        const friendIds = new Set(friends.map((friend) => friend.id));

        return entries.every((entry) => friendIds.has(entry.id as string));
    }, [entries, friends]);
};

interface UseErrorMessageOptions {
    loadingState: LoadingState;
    search: string;
    entries: PersonFinderEntry[];
    groupName?: string;
    areOnlyFriendsGiven?: boolean;
}

export const useErrorMessage = ({
    loadingState,
    search,
    entries,
    groupName,
    areOnlyFriendsGiven,
}: UseErrorMessageOptions) => {
    const ts = textStrings.components.personFinder.wrapper.body.group.errorMessage;

    if (search.length <= 2 && !areOnlyFriendsGiven) {
        return (
            <StyledPersonFinderGroupErrorMessage>
                {getPersonFinderTextstringValue({ textstring: ts.minSearchLength })}
            </StyledPersonFinderGroupErrorMessage>
        );
    }

    if (entries.length === 0) {
        if (loadingState === LoadingState.Error && search.length) {
            return (
                <StyledPersonFinderGroupErrorMessage>
                    {getPersonFinderTextstringValue({
                        textstring: ts.noResults,
                        replacements: {
                            groupName,
                            search,
                        },
                    })}
                </StyledPersonFinderGroupErrorMessage>
            );
        }

        if (search.length === 0) {
            return (
                <StyledPersonFinderGroupErrorMessage>
                    {getPersonFinderTextstringValue({
                        textstring: ts.emptySearch,
                        replacements: { groupName },
                    })}
                </StyledPersonFinderGroupErrorMessage>
            );
        }
    }

    return null;
};
