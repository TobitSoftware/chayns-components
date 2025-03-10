import { RefObject, useEffect, useState } from 'react';
import { PersonEntry, SiteEntry } from '../types/personFinder';
import { isSiteEntry } from '../utils/personFinder';

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

    const { url, commonSites, name, firstName, lastName, id } = entry as PersonEntry & SiteEntry;

    const imageUrl = `https://sub60.tobit.com/${isSite ? 'l' : 'u'}/${id}?size=120`;
    const title = isSite ? name : `${firstName ?? ''} ${lastName ?? ''}`;
    const subtitle = isSite
        ? url
        : `chaynsID: ${id}${commonSites ? ` - ${commonSites} gemeinsame Sites` : ''}`;

    return {
        isSite,
        title,
        subtitle,
        imageUrl,
    };
};
