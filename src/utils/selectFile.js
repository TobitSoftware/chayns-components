/**
 * Requests a file upload from the user and returns the selected files
 * @param {{}} config - Config object that describes the behaviour of the select-dialog
 * @param {string} [config.type = *\/*] - MIME-Types that are allowed to be selected
 * @param {bool} [config.multiple = false] - Allow the selecting of multiple files
 * @returns {Promise<File>|Promise<File[]>|Promise<FileList>|Promise<null>} - Promise is resolved when user selects a file.
 * Returns the file (or file list, when multiple is set)
 */
function selectFile({ type = '*/*', multiple = false } = {}) {
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';

        if (type !== '*/*' && type) {
            input.accept = type;
        }

        if (multiple) {
            input.multiple = true;
        }

        input.style.visibility = 'none';
        input.style.width = '0';
        input.style.height = '0';
        input.style.display = 'none';

        document.body.appendChild(input);

        input.addEventListener('change', (event) => {
            document.body.removeChild(input);

            resolve(event);
        });

        input.click();
    }).then((event) => {
        if (!event || !event.target || !event.target.files) {
            return null;
        }

        const { files } = event.target;

        if (!(files instanceof FileList) || files.length <= 0) {
            return null;
        }

        if (!multiple) {
            return files[0];
        }

        return files;
    });
}

export default selectFile;
