import React, { Component } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import FileUpload from '../../src/react-chayns-upload/component/FileUpload';

export default class FileUploadExample extends Component {
    constructor() {
        super();

        this.selectFiles = this.selectFiles.bind(this);
        this.selectImages = this.selectImages.bind(this);
        this.selectAudio = this.selectAudio.bind(this);
        this.selectVideo = this.selectVideo.bind(this);
        this.state = { data: '' };
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
        const { data } = this.state;

        return (
            <div>
                <FileUpload
                    stopPropagation
                    className="file-upload--files"
                    onChange={this.selectFiles}
                />
                <br/>
                <FileUpload
                    type={FileUpload.TYPE_IMAGE}
                    onUpload={(d) => {
                        this.setState({ data: d });
                    }}
                />
                {data}
                <br/>
                <FileUpload
                    type={FileUpload.TYPE_AUDIO}
                    onChange={this.selectAudio}
                />
                <br/>
                <FileUpload
                    type={FileUpload.TYPE_VIDEO}
                    onChange={this.selectVideo}
                />
                <br/>
                <FileUpload
                    onChange={this.selectFiles}
                    uploadText="Upload trash"
                    customIcon={faTrash}
                />
                <br/>
                <FileUpload
                    onChange={this.selectFiles}
                >
                    <div
                        className="chayns__background-color--white-4 chayns__color--shade-1"
                        style={{
                            padding: '10px', margin: '5px', textAlign: 'center', borderRadius: '2px'
                        }}
                    >
                        {'Test'}
                    </div>
                </FileUpload>
                <br/>
                <FileUpload
                    onChange={this.selectFiles}
                    disableListeners
                    uploadText="Upload File (disabled listeners)"
                />
                <br/>
                <FileUpload
                    onUpload={(data) => {
                        this.setState({ data });
                    }}
                    onChange={(files, validFiles, invalidFiles) => { this.selectFiles(files, validFiles, invalidFiles); }}
                    types={[{
                        type: 'image',
                        onUpload: (data) => {
                            console.log(data, 'image');
                        }
                    }, {
                        type: 'video',
                        onUpload: (data) => {
                            console.log(data, 'video');
                        }
                    }]}
                />
            </div>
        );
    }
}
