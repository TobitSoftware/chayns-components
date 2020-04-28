/* eslint-disable no-return-assign,jsx-a11y/alt-text */
import React, { Component } from 'react';

import FileInput from '../../src/react-chayns-file_input/component/FileInput';
import imageUpload from '../../src/utils/imageUpload';
import Button from '../../src/react-chayns-button/component/Button';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';

export default class FileInputExample extends Component {
    constructor(props) {
        super(props);
        this.state = { images: [] };
        chayns.register({ apiDialogs: true });
    }

    onChange = (validFiles) => {
        const { images } = this.state;
        this.setState({ images: images.concat(validFiles.map((f) => ({ file: f }))) });
    };

    onClick = async () => {
        const { images } = this.state;
        const data = await chayns.dialog.mediaSelect({ multiselect: true });
        this.setState({ images: images.concat(data.selection.map((url) => ({ url }))) });
    };

    onDelete = (image, index) => {
        const { images } = this.state;
        const img = images.slice();
        img.splice(index, 1);
        this.setState({ images: img });
    };

    onDragEnd = (images) => {
        this.setState({ images });
    };

    upload = () => {
        const { images } = this.state;
        images.forEach(async (image) => {
            const result = await imageUpload(image.file || image.url, 'componentsTestUpload', chayns.env.user.personId, chayns.env.site.id);
            // eslint-disable-next-line no-console
            console.log('Uploaded image', result);
            this.logRef.innerText = `${this.logRef.innerText}${result.base}/${result.key}\n`;
        });
    };

    render() {
        const { images } = this.state;
        return (
            <div>
                <FileInput
                    style={{ marginBottom: '20px' }}
                    stopPropagation
                    items={[{
                        types: FileInput.typePresets.TSIMG_CLOUD, // only images are allowed
                        maxFileSize: 4194304, // max file size is 4 MB
                        maxNumberOfFiles: 0, // no limit for number of files
                        onChange: this.onChange,
                        content: { text: 'Bild hochladen' },
                    }, {
                        onClick: this.onClick,
                        content: { text: 'Bild auswählen', icon: 'ts-image' },
                    }]}
                />
                <h3>Gallery with dragMode and deleteMode</h3>
                <Gallery
                    images={images}
                    deleteMode
                    onDelete={this.onDelete}
                    dragMode
                    onDragEnd={this.onDragEnd}
                    style={{ marginBottom: '30px' }}
                />
                <h3>Gallery with dragMode</h3>
                <Gallery
                    images={images}
                    dragMode
                    onDragEnd={this.onDragEnd}
                    style={{ marginBottom: '30px' }}
                />
                <h3>Gallery with deleteMode</h3>
                <Gallery
                    images={images}
                    deleteMode
                    onDelete={this.onDelete}
                    style={{ marginBottom: '30px' }}
                />
                <Button
                    disabled={!images}
                    onClick={this.upload}
                >
                    Upload
                </Button>
                <p ref={(ref) => this.logRef = ref}/>
                <FileInput
                    items={[{
                        types: [FileInput.types.ALL],
                        onChange: console.log,
                        content: { text: 'Upload all' },
                    }]}
                />
            </div>
        );
    }
}
