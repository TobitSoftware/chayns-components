/* eslint-disable */
// @ts-nocheck

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
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
    const token = process.env.SPACE_API_TOKEN;

    if (!token) {
        console.error('❌ Missing API token.');
        return undefined;
    }

    const res = await fetch(`${CHAYNS_SPACE_URL}upload`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.error('❌ Failed to fetch upload credentials from chayns.space.');
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

    const fullKey = `${credentials.key}${sanitizedName}`;
    form.append('Content-Type', mimeType);
    form.append('key', fullKey);
    form.append('file', new Blob([fileBuffer], { type: mimeType }), sanitizedName);

    const res = await fetch(AWS_UPLOAD_URL, {
        method: 'POST',
        body: form as any,
    });

    if (res.ok) {
        console.log(`✅ Successfully uploaded file to: ${fullKey}`);
        return fullKey;
    }

    const text = await res.text();
    console.error(`❌ Upload failed (${res.status}): ${text}`);
    return undefined;
};

/**
 * Loads the generated docs.json file from /dist and uploads it to AWS.
 */
export const uploadDocs = async (): Promise<void> => {
    const docsPath = path.resolve(__dirname, '../dist/docs.json');

    if (!fs.existsSync(docsPath)) {
        console.error(`❌ File not found: ${docsPath}`);
        return;
    }

    const fileBuffer = fs.readFileSync(docsPath);
    const fileName = path.basename(docsPath);

    console.log(`⚙️  Starting upload for ${fileName}...`);

    const key = await uploadFile(fileBuffer, fileName, 'application/json');

    if (key) {
        console.log(`✅ Upload completed successfully. Key: ${key}`);
    } else {
        console.error('❌ Upload failed.');
    }
};

/**
 * Only execute automatically when the script is run directly (not imported).
 */
const isDirectRun = process.argv[1] && process.argv[1].endsWith('upload-docs.ts');

if (isDirectRun) {
    uploadDocs().catch((err) => {
        console.error('❌ Unexpected error during upload:', err);
        process.exit(1);
    });
}
