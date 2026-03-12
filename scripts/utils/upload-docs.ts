import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import type {
    AuthTokenResponse,
    AwsPreUploadResponse,
    AwsUploadFields,
    UploadFileOptions,
} from '../types/upload-docs';
import { script } from './logger';

const AUTH_URL = 'https://auth.tobit.com/v2/token';
const CHAYNS_SPACE_URL = 'https://api.chayns.space/';
const AWS_UPLOAD_URL = 'https://chayns-space.s3.amazonaws.com/';
const VERSION = '5';
const SITE_ID = '77896-21884';
const DEFAULT_HEADERS: Pick<AwsUploadFields, 'acl' | 'x-amz-algorithm'> = {
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    acl: 'private',
};

/**
 * Requests temporary AWS upload fields from the remote API.
 */
const getAwsUploadFields = async (): Promise<AwsUploadFields | null> => {
    const username = process.env.API_TOKEN_KEY;
    const password = process.env.API_TOKEN_SECRET;

    if (!username || !password) {
        script.warn('Missing API tokens. Skipping docs upload.');
        return null;
    }

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    const tokenResponse = await fetch(AUTH_URL, {
        body: JSON.stringify({ tokenType: 2 }),
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    if (!tokenResponse.ok) {
        throw new Error(`Failed to fetch API token (${tokenResponse.status}).`);
    }

    const tokenData = (await tokenResponse.json()) as AuthTokenResponse;
    const uploadResponse = await fetch(`${CHAYNS_SPACE_URL}upload`, {
        headers: {
            Authorization: `bearer ${tokenData.token}`,
            siteId: SITE_ID,
        },
        method: 'GET',
    });

    if (!uploadResponse.ok) {
        throw new Error(`Failed to fetch upload credentials (${uploadResponse.status}).`);
    }

    const uploadData = (await uploadResponse.json()) as AwsPreUploadResponse;

    return {
        ...DEFAULT_HEADERS,
        Policy: uploadData.base64Policy,
        key: uploadData.param.keyPrefix,
        'x-amz-credential': uploadData.param.credential,
        'x-amz-date': uploadData.param.date,
        'x-amz-meta-operation-id': uploadData.param.operationId,
        'x-amz-signature': uploadData.signature,
    };
};

/**
 * Uploads a generated file to AWS using temporary upload fields.
 */
const uploadFile = async ({
    fileBuffer,
    fileName,
    mimeType = 'application/json',
}: UploadFileOptions): Promise<string | null> => {
    const uploadFields = await getAwsUploadFields();

    if (!uploadFields) {
        return null;
    }

    const sanitizedName = fileName.replace(/[^0-9a-zA-Z!\-_.*'()/]/g, '_');
    const fullKey = `${uploadFields.key}chayns-components/v${VERSION}/${sanitizedName}`;
    const formData = new FormData();

    Object.entries(uploadFields).forEach(([key, value]) => {
        if (key !== 'key') {
            formData.append(key, value);
        }
    });

    formData.append('Content-Type', mimeType);
    formData.append('key', fullKey);
    formData.append('file', fileBuffer, {
        contentType: mimeType,
        filename: fileName,
    });

    const uploadResponse = await fetch(AWS_UPLOAD_URL, {
        body: formData as unknown as BodyInit,
        headers: formData.getHeaders(),
        method: 'POST',
    });

    if (!uploadResponse.ok) {
        const responseText = await uploadResponse.text();
        throw new Error(`Upload failed (${uploadResponse.status}): ${responseText}`);
    }

    script.success(`Uploaded ${fileName} to ${fullKey}.`);

    return fullKey;
};

/**
 * Uploads the generated docs JSON file when upload credentials are available.
 */
export const uploadDocs = async (): Promise<string | null> => {
    const docsPath = path.resolve(__dirname, '../../dist/docs.json');

    if (!fs.existsSync(docsPath)) {
        throw new Error(`Generated docs file not found at ${docsPath}.`);
    }

    const fileBuffer = fs.readFileSync(docsPath);
    const fileName = path.basename(docsPath);

    script.step(`Uploading ${fileName}...`);

    try {
        return await uploadFile({
            fileBuffer,
            fileName,
            mimeType: 'application/json',
        });
    } catch (error) {
        script.error('Failed to upload generated docs.', error);
        throw error;
    }
};
