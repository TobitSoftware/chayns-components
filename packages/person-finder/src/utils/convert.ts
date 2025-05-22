import { PersonEntry, PersonEntryResult, SiteEntry, SiteEntryResult } from '../types/personFinder';

export const convertSiteEntry = (entries: SiteEntryResult[]): SiteEntry[] =>
    entries.map((entry) => ({
        id: entry.siteId,
        name: entry.name,
        url: `https://${entry.domain}`,
    }));

export const convertPersonEntry = (entries: PersonEntryResult[]): PersonEntry[] =>
    entries.map((entry) => ({
        id: entry.personId,
        firstName: entry.firstName,
        lastName: entry.lastName,
        commonSites: entry.relationCount,
        isVerified: entry.verified,
    }));
