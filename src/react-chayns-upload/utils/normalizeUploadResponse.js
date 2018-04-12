import { ROOT_URL } from '../constants/api';

export default function normalizeUploadResponse(data) {
    if(!data || !data.imageLocations || data.imageLocations.length === 0) {
        return null;
    }

    return data.imageLocations.map((imageLocation) => {
        return {
            location: imageLocation,
            url: `${ROOT_URL}${imageLocation}`,
        };
    });
}
