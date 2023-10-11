interface SelectFilesOptions {
    type?: string;
    multiple: boolean;
}

export const selectFiles = ({ type, multiple }: SelectFilesOptions): Promise<File[]> =>
    new Promise((resolve) => {
        const input = document.createElement('input');

        input.type = 'file';
        input.style.visibility = 'none';
        input.style.width = '0';
        input.style.height = '0';
        input.style.display = 'none';

        if (type !== '*/*' && type) {
            input.accept = type;
        }

        if (multiple) {
            input.multiple = true;
        }

        document.body.appendChild(input);

        input.addEventListener('change', (event) => {
            document.body.removeChild(input);

            if (!event.target) {
                resolve([]);

                return;
            }

            const target = event.target as HTMLInputElement;

            const { files } = target;

            if (!files) {
                resolve([]);

                return;
            }

            const fileArray = Object.values(files);

            const testFile = fileArray[0];

            if (testFile) {
                void getFileAsArrayBuffer(testFile)
                    .then((result) => {
                        console.log('SELECT FILES 1', { testFile, result });
                    })
                    .catch((e) => {
                        console.error('Error at SELECT FILES 1', e);
                    });
            }

            const filteredFileArray = fileArray.filter((file) => {
                const sizeInMB = file.size / 1024 / 1024;

                if (file.type.includes('video/') && sizeInMB > 500) {
                    return false;
                }

                return !(file.type.includes('image/') && sizeInMB > 64);
            });

            if (fileArray.length !== filteredFileArray.length) {
                // ToDo show dialog that some files are to big
            }

            if (filteredFileArray.length === 0) {
                // ToDo show dialog that all files are to big
            }

            resolve(filteredFileArray);
        });

        input.click();
    });

export const getFileAsArrayBuffer = (file: File): Promise<string | ArrayBuffer> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target?.result) {
                resolve(e.target.result);
            } else {
                reject(Error('Could not get array buffer.'));
            }
        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
    });
