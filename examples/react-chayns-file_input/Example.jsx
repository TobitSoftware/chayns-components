import React, { Component } from 'react';
import ExampleContainer from '../ExampleContainer';

import FileInput from '../../src/react-chayns-file_input/component/FileInput';
import imageUpload from '../../src/utils/imageUpload';

export default class FileInputExample extends Component {
    render() {
        return (
            <ExampleContainer headline="FileInput">
                <FileInput/>
                <br/>
                <FileInput
                    stopPropagation
                    items={[{
                        types: [FileInput.types.IMAGE], // images are allowed
                        maxFileSize: 4194304, // max file size is 4 MB
                        maxNumberOfFiles: 0, // no limit for number of files
                        onChange: async (validFiles) => {
                            if (validFiles.length > 0) console.log('imageUpload', await imageUpload(validFiles[0], 'componentsTest', chayns.env.user.personId));
                        },
                        content: { text: 'Bilder hochladen' },
                    }, {
                        onClick: async () => {
                            const data = await chayns.dialog.mediaSelect({});
                            if (data.selection.length > 0) console.log('imageUpload', await imageUpload(data.selection[0], 'componentsTest', chayns.env.user.personId));
                        },
                        content: { text: 'Bilder von Pixabay wählen', icon: 'ts-image' },
                    }]}
                />
            </ExampleContainer>
        );
    }
}
