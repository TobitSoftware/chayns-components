import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { PersonEntry, PersonFinderFilterTypes, SiteEntry } from '../types/personFinder';
import { destructureData, isSiteEntry, loadData } from '../utils/personFinder';
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

export const useLoadData = () => {
    const { data, activeFilter, updateData } = usePersonFinder();

    const search = '';

    const handleLoadData = useCallback(
        (filterToLoadMore?: PersonFinderFilterTypes) => {
            /**
             * Load data for the selected types.
             * If the active filters are undefined or an empty array, all filter should be loaded.
             * If a filter is given to load more, only this filter is used.
             */
            const filtersToProcess = filterToLoadMore
                ? [filterToLoadMore]
                : Object.values(PersonFinderFilterTypes).filter(
                      (filterType) =>
                          !activeFilter ||
                          activeFilter.length === 0 ||
                          activeFilter.includes(filterType),
                  );

            filtersToProcess.forEach((filterType) => {
                const { entries, skip, searchString } = destructureData(data, filterType);

                /**
                 * This means only the active filter has changed, so nothing should be loaded for this filter.
                 */
                if (search === searchString && !filterToLoadMore) {
                    return;
                }

                void loadData({ skip }).then((result) => {
                    const newData = {
                        count: result.count,
                        skip: result.skip,
                        searchString: search,
                        entries:
                            typeof filterToLoadMore === 'string'
                                ? [...entries, ...result.entries]
                                : result.entries,
                    };

                    if (typeof updateData === 'function') {
                        updateData(filterType, newData);
                    }
                });
            });
        },
        [activeFilter, data, updateData],
    );

    return { handleLoadData };
};
