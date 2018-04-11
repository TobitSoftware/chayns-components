import { TSIMG_URL } from '../constants/api';

export default function uploadCloudImages(files) {
    if(!files || !files[0]) {
        return Promise.resolve(null);
    }

    return chayns.uploadToCloud(TSIMG_URL, files[0]).then((retval) => {
        if (retval.response.statusCode === 200) {
            try {
                return JSON.parse(retval.response.data);
            } catch (err) {
                return null;
            }
        }
        return null;
    });
}