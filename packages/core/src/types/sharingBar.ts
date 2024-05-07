export interface SharingBarProvider {
    id: number;
    providerId: number;
    name: string;
    androidIdentifier: string | null;
    icon: string;
    url: string | null;
    available: boolean;
}
