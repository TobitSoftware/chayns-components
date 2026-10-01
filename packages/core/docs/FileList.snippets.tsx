/* eslint-disable */
// @ts-nocheck
// prettier-ignore
<FileList
    files={[
        {
            id: 'file-1',
            mimeType: 'text/plain',
            name: 'Document.txt',
            size: 1024,
        },
    ]}
/>;

// Add per-file actions and handle downloads in your project.
// prettier-ignore
<FileList
    shouldAllowDownload={false}
    files={[
        {
            id: 'file-1',
            mimeType: 'text/plain',
            name: 'Document.txt',
            contextMenuItems: [
                {
                    key: 'custom-download',
                    text: 'Download',
                    icons: ['fa fa-download'],
                    onClick: () => downloadFile('file-1'),
                },
            ],
        },
    ]}
/>;
