export enum PersonFinderFilterTypes {
    PERSON = 'Person',
    SITES = 'Sites',
}

export type PersonFinderEntry = PersonEntry | SiteEntry;

interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
}

interface SiteEntry {
    url: string;
    name: string;
}
