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

export type PersonFinderDataMap = {
    [K in PersonFinderFilterTypes]?: PersonFinderData;
};

export enum LoadingState {
    None = 'none',
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export type LoadingStateMap = { [K in PersonFinderFilterTypes]?: LoadingState };

export interface DefaultEntry {
    id: string;
    name: string;
}

export type PersonFinderEntry = PersonEntry | SiteEntry;

export interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
    isVerified: boolean;
}

export interface SiteEntry {
    id: string;
    url: string;
    name: string;
}

export interface SiteEntryResult {
    name: string;
    siteId: string;
    locationId: number;
    lastLogin: number | null;
    score: number;
    domain: string;
}

export interface PersonEntryResult {
    personId: string;
    userId: number;
    firstName: string;
    lastName: string;
    relationCount: number;
    score: number;
    signOfLife: Date;
    verified: boolean;
}
