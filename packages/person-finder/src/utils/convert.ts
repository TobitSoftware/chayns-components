import {
    PersonEntry,
    PersonEntryResult,
    PersonFinderFilterTypes,
    SiteEntry,
    SiteEntryResult,
} from '../components/person-finder/PersonFinder.types';

export const convertSiteEntry = (entries: SiteEntryResult[]): SiteEntry[] =>
    entries.map((entry) => ({
        id: entry.siteId,
        name: entry.name,
        url: `https://${entry.domain}`,
        type: PersonFinderFilterTypes.SITE,
    }));

interface ConvertPersonEntryOptions {
    shouldShowLastOnlineTime?: boolean;
}

export const convertPersonEntry = (
    entries: PersonEntryResult[],
    { shouldShowLastOnlineTime }: ConvertPersonEntryOptions = {},
): PersonEntry[] =>
    entries.map((entry) => ({
        id: entry.personId,
        firstName: entry.firstName,
        lastName: entry.lastName,
        commonSites: entry.relationCount,
        isVerified: entry.verified,
        type: PersonFinderFilterTypes.PERSON,
        lastOnlineTime: shouldShowLastOnlineTime ? entry.signOfLife : undefined,
    }));
