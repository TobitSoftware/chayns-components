export enum PersonFinderFilterTypes {
    PERSON = 'person',
    SITE = 'site',
}

export enum Priority {
    HIGH,
    NORMAL,
}

export interface PersonFinderData {
    searchString: string;
    count: number;
    skip: number;
    entries: PersonFinderEntry[];
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
