/* eslint-disable */
// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAYNS_SPACE_URL = 'https://api.chayns.space/';
const AWS_UPLOAD_URL = 'https://chayns-space.s3.amazonaws.com/';

interface AwsUploadCredentials {
    key: string;
    Policy: string;
    'x-amz-algorithm': string;
    acl: string;
    'x-amz-credential': string;
    'x-amz-date': string;
    'x-amz-meta-operation-id': string;
    'x-amz-signature': string;
}

const DEFAULT_HEADERS = {
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    acl: 'private',
};

/**
 * Retrieves temporary AWS S3 upload credentials from chayns.space.
 */
const awsPreUpload = async (): Promise<AwsUploadCredentials | undefined> => {
    const username = process.env.API_TOKEN_KEY;
    const password = process.env.API_TOKEN_SECRET;

    if (!username || !password) {
        console.error('🔴 Missing API tokens.');
        return undefined;
    }

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    const tokenRes = await fetch(`https://auth.tobit.com/v2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ tokenType: 2 }),
    });

    if (!tokenRes.ok) {
        console.error('🔴 Failed to fetch API key.');
        return undefined;
    }

    const data = await tokenRes.json();

    const res = await fetch(`${CHAYNS_SPACE_URL}upload`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${data.token}`,
            siteId: '77896-21884',
        },
    });

    if (!res.ok) {
        console.error('🔴 Failed to fetch upload credentials from chayns.space.', res);
        return undefined;
    }

    const {
        param: { keyPrefix, credential, date, operationId },
        signature,
        base64Policy,
    } = await res.json();

    return {
        ...DEFAULT_HEADERS,
        key: keyPrefix,
        'x-amz-credential': credential,
        'x-amz-date': date,
        'x-amz-meta-operation-id': operationId,
        'x-amz-signature': signature,
        Policy: base64Policy,
    };
};

/**
 * Uploads a single file to AWS (via chayns.space temporary credentials).
 */
const uploadFile = async (
    fileBuffer: Buffer,
    fileName: string,
    mimeType = 'application/json',
): Promise<string | undefined> => {
    const credentials = await awsPreUpload();

    if (!credentials) return undefined;

    const sanitizedName = fileName.replace(/[^0-9a-zA-Z!\-_.*'()/]/g, '_');
    const form = new FormData();

    Object.entries(credentials).forEach(([key, value]) => {
        if (key !== 'key') form.append(key, value);
    });

    const fullKey = `${credentials.key}chayns-components/${sanitizedName}`;

    const blob = new Blob([fileBuffer], { type: mimeType });
    const file = new File([blob], fileName, { type: mimeType });

    form.append('Content-Type', mimeType);
    form.append('key', fullKey);
    form.append('file', file);

    const res = await fetch(AWS_UPLOAD_URL, {
        method: 'POST',
        body: form,
    });

    if (res.ok) {
        console.log(`🟢 Successfully uploaded file to: ${fullKey}`);
        return fullKey;
    }

    const text = await res.text();
    console.error(`🔴 Upload failed (${res.status}): ${text}`);
    return undefined;
};

/**
 * Loads the generated docs.json file from /dist and uploads it to AWS.
 */
export const uploadDocs = async (): Promise<void> => {
    const docsPath = path.resolve(__dirname, '../dist/docs.json');

    if (!fs.existsSync(docsPath)) {
        console.error(`🔴 File not found: ${docsPath}`);
        return;
    }

    const fileBuffer = fs.readFileSync(docsPath);
    const fileName = path.basename(docsPath);

    console.log(`⚙️ Starting upload for ${fileName}...`);

    await uploadFile(fileBuffer, fileName, 'application/json');
};

/**
 * Only execute automatically when the script is run directly (not imported).
 */
const isDirectRun = process.argv[1] && process.argv[1].endsWith('upload-docs.ts');

if (isDirectRun) {
    uploadDocs().catch((err) => {
        console.error('🔴 Unexpected error during upload:', err);
        process.exit(1);
    });
}
