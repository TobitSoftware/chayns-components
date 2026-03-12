/**
 * Describes the OAuth token response returned by the Tobit auth endpoint.
 */
export interface AuthTokenResponse {
    token: string;
}

/**
 * Describes the temporary upload payload returned by chayns.space.
 */
export interface AwsPreUploadResponse {
    base64Policy: string;
    param: {
        credential: string;
        date: string;
        keyPrefix: string;
        operationId: string;
    };
    signature: string;
}

/**
 * Describes the normalized AWS upload fields used for the multipart upload.
 */
export interface AwsUploadFields {
    Policy: string;
    acl: string;
    key: string;
    'x-amz-algorithm': string;
    'x-amz-credential': string;
    'x-amz-date': string;
    'x-amz-meta-operation-id': string;
    'x-amz-signature': string;
}

/**
 * Describes the parameters required to upload a generated file.
 */
export interface UploadFileOptions {
    fileBuffer: Buffer;
    fileName: string;
    mimeType?: string;
}
