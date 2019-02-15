/* eslint-disable no-return-assign,jsx-a11y/alt-text */
import React, { Component } from 'react';
import ExampleContainer from '../ExampleContainer';

import FileInput from '../../src/react-chayns-file_input/component/FileInput';
import imageUpload from '../../src/utils/imageUpload';
import Button from '../../src/react-chayns-button/component/Button';

export default class FileInputExample extends Component {
    constructor(props) {
        super(props);
        this.state = { file: null };
    }

    previewFile = (image) => {
        const reader = new FileReader();

        reader.addEventListener('load', (e) => {
            this.imgRef.src = e.target.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    };

    render() {
        const { file: stateFile } = this.state;

        return (
            <ExampleContainer headline="FileInput">
                <FileInput style={{ marginBottom: '20px' }}/>
                <FileInput
                    style={{ marginBottom: '20px' }}
                    stopPropagation
                    items={[{
                        types: [FileInput.types.IMAGE], // only images are allowed
                        maxFileSize: 4194304, // max file size is 4 MB
                        maxNumberOfFiles: 0, // no limit for number of files
                        onChange: async (validFiles) => {
                            if (validFiles.length > 0) {
                                const file = validFiles[0];
                                this.previewFile(file);
                                this.setState({ file });
                            }
                        },
                        content: { text: 'Upload image' },
                    }, {
                        onClick: async () => {
                            const data = await chayns.dialog.mediaSelect({});
                            if (data.selection.length > 0) {
                                const url = data.selection[0];
                                this.imgRef.src = url;
                                this.setState({ file: url });
                            }
                        },
                        content: { text: 'Choose image from pixabay', icon: 'ts-image' },
                    }]}
                />
                <img ref={ref => this.imgRef = ref} style={{ width: '100%' }}/>
                <Button
                    disabled={!stateFile}
                    onClick={async () => {
                        const result = await imageUpload(stateFile, 'componentsTest', null, chayns.env.site.siteId);
                        chayns.dialog.alert('Uploaded', JSON.stringify(result));
                    }}
                >
                    {'Upload'}
                </Button>
            </ExampleContainer>
        );
    }
}
