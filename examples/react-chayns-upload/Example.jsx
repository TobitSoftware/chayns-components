import React, { Component } from 'react';
import ExampleContainer from '../ExampleContainer';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import FileUpload from '../../src/react-chayns-upload/component/FileUpload';

export default class Example extends Component {
    constructor() {
        super();

        this.selectFiles = this.selectFiles.bind(this);
        this.selectImages = this.selectImages.bind(this);
        this.selectAudio = this.selectAudio.bind(this);
        this.selectVideo = this.selectVideo.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    selectFiles(files, validFiles, invalidFiles) {
        console.log(`You have selected ${files.length} files of which ${validFiles.length} are valid and ${invalidFiles.length} invalid`);
    }

    // eslint-disable-next-line class-methods-use-this
    selectImages(files, validFiles, invalidFiles) {
        console.log(`You have selected ${files.length} images of which ${validFiles.length} are valid and ${invalidFiles.length} invalid`);
    }

    // eslint-disable-next-line class-methods-use-this
    selectAudio(files, validFiles, invalidFiles) {
        console.log(`You have selected ${files.length} audio-files of which ${validFiles.length} are valid and ${invalidFiles.length} invalid`);
    }

    // eslint-disable-next-line class-methods-use-this
    selectVideo(files, validFiles, invalidFiles) {
        console.log(`You have selected ${files.length} videos of which ${validFiles.length} are valid and ${invalidFiles.length} invalid`);
    }

    render() {
        return(
            <ExampleContainer headline="FileUpload">
                <FileUpload
                    className="file-upload--files"
                    onChange={this.selectFiles}
                />
                <br />
                <FileUpload
                    type={FileUpload.TYPE_IMAGE}
                    onChange={this.selectImages}
                />
                <br />
                <FileUpload
                    type={FileUpload.TYPE_AUDIO}
                    onChange={this.selectAudio}
                />
                <br />
                <FileUpload
                    type={FileUpload.TYPE_VIDEO}
                    onChange={this.selectVideo}
                />
                <br />
                <FileUpload
                    onChange={this.selectFiles}
                    uploadText="Upload trash"
                    customIcon={faTrash}
                />
                <br />
                <FileUpload
                    onChange={this.selectFiles}
                >
                    Test
                </FileUpload>
                <br />
                <FileUpload
                    onChange={this.selectFiles}
                    disableListeners
                    uploadText="Upload File (disabled listeners)"
                />
            </ExampleContainer>
        );
    }
}
