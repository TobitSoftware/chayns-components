import React from 'react';
import ExampleContainer from '../ExampleContainer';

import FileUpload from '../../src/react-chayns-upload/component/FileUpload';

import '../../src/react-chayns-upload/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();

        this.selectFiles = this.selectFiles.bind(this);
        this.selectImages = this.selectImages.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    selectFiles(files, validFiles, invalidFiles) {
        console.log(`You have selected ${files.length} files of which ${validFiles.length} are valid and ${invalidFiles.length} invalid`);
    }

    // eslint-disable-next-line class-methods-use-this
    selectImages(files, validFiles, invalidFiles) {
        console.log(`You have selected ${files.length} images of which ${validFiles.length} are valid and ${invalidFiles.length} invalid`);
    }

    render() {
        return(
            <ExampleContainer headline="FileUpload">
                <FileUpload
                    onChange={this.selectFiles}
                />
                <br />
                <FileUpload
                    type="images"
                    onChange={this.selectImages}
                />
            </ExampleContainer>
        );
    }
}
