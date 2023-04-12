interface SelectFileProps {
    type: string;
    multiple: boolean;
}

export const selectFile = ({ type, multiple }: SelectFileProps): Promise<null | FileList> =>
    new Promise((resolve) => {
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

            const target = event.target as HTMLInputElement;
            const { files } = target;

            resolve(files);
        });

        input.click();
    });
