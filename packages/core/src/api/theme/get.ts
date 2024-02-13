import { getSite } from 'chayns-api';
import type { DesignSettings } from '../../types/colorSchemeProvider';

export const getDesignSettings = async (): Promise<DesignSettings | undefined> => {
    const { id } = getSite();

    const response = await fetch(`https://api-qa.chayns.net/css/${id}/style/v2`, {
        method: 'GET',
    });

    if (response.status === 200) {
        return (await response.json()) as DesignSettings;
    }

    return undefined;
};
