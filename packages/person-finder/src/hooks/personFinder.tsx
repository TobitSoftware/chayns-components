import React, { RefObject, useEffect, useMemo, useState } from 'react';
import { PersonEntry, PersonFinderEntry, SiteEntry } from '../types/personFinder';
import { isSiteEntry } from '../utils/personFinder';
import { VerificationBadge } from '@chayns-components/core';
import { usePersonFinder } from '../components/PersonFinderProvider';

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

export const usePersonFinderItem = (entry: PersonEntry | SiteEntry) => {
    const isSite = isSiteEntry(entry);

    const { url, commonSites, name, firstName, lastName, id, isVerified } = entry as PersonEntry &
        SiteEntry;

    const imageUrl = `https://sub60.tobit.com/${isSite ? 'l' : 'u'}/${id}?size=120`;
    const titleElement = isVerified && <VerificationBadge />;
    const title = isSite ? name : `${firstName ?? ''} ${lastName ?? ''}`;
    const subtitle = isSite
        ? url
        : `chaynsID: ${id}${commonSites ? ` - ${commonSites} gemeinsame Sites` : ''}`;

    return {
        isSite,
        title,
        subtitle,
        imageUrl,
        titleElement,
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

        return entries.every((entry) => friendIds.has(entry.id));
    }, [entries, friends]);
};
