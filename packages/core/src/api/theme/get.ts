import { ChaynsDesignSettings, ChaynsParagraphFormat, getSite } from 'chayns-api';

export const getDesignSettings = async (
    siteId?: string,
): Promise<ChaynsDesignSettings | undefined> => {
    let id = siteId;

    if (!id) id = getSite().id;

    const response = await fetch(`https://api.chayns.net/css/${id}/style/v2`, {
        method: 'GET',
    });

    if (response.status === 200) {
        return (await response.json()) as ChaynsDesignSettings;
    }

    return undefined;
};

export const getParagraphFormat = async (
    siteId?: string,
): Promise<ChaynsParagraphFormat[] | undefined> => {
    let id = siteId;

    if (!id) id = getSite().id;

    const response = await fetch(`https://api.chayns.net/css/${id}/paragraphFormat`, {
        method: 'GET',
    });

    if (response.status === 200) {
        return (await response.json()) as ChaynsParagraphFormat[];
    }

    return undefined;
};
