export enum PersonFinderFilterTypes {
    PERSON = 'person',
    SITE = 'site',
    UAC = 'uac',
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

export type PersonFinderEntry = PersonEntry | SiteEntry | UACEntry;

export interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
    isVerified: boolean;
    type: PersonFinderFilterTypes.PERSON;
}

export interface SiteEntry {
    id: string;
    url: string;
    name: string;
    type: PersonFinderFilterTypes.SITE;
}

export interface UACEntry {
    id: number;
    name: string;
    isSystemGroup: boolean;
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

export type ThrottledFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): ReturnType<T>;
    cancel: () => void;
    flush: () => void;
};
