export enum PersonFinderFilterTypes {
    PERSON = 'Person',
    SITES = 'Sites',
}

export type PersonFinderEntry = PersonEntry | SiteEntry;

export interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
}

export interface SiteEntry {
    url: string;
    name: string;
}
