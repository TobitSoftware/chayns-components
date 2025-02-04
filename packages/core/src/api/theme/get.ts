import { getSite } from 'chayns-api';
import type { DesignSettings, ParagraphFormat } from '../../types/colorSchemeProvider';

export const getDesignSettings = async (siteId?: string): Promise<DesignSettings | undefined> => {
    let id = siteId;

    if (!id) id = getSite().id;

    const response = await fetch(`https://api.chayns.net/css/${id}/style/v2`, {
        method: 'GET',
    });

    if (response.status === 200) {
        return (await response.json()) as DesignSettings;
    }

    return undefined;
};

export const getParagraphFormat = async (
    siteId?: string,
): Promise<ParagraphFormat[] | undefined> => {
    let id = siteId;

    if (!id) id = getSite().id;

    const response = await fetch(`https://api.chayns.net/css/${id}/paragraphFormat`, {
        method: 'GET',
    });

    if (response.status === 200) {
        return (await response.json()) as ParagraphFormat[];
    }

    return undefined;
};
