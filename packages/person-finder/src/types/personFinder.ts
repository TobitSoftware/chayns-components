export enum PersonFinderFilterTypes {
    PERSON = 'Person',
    SITE = 'Site',
}

export enum Priority {
    HIGH,
    NORMAL,
}

export type PersonFinderEntry = PersonEntry | SiteEntry;

export interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
}

export interface SiteEntry {
    id: string;
    url: string;
    name: string;
}
