/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';

import FileInput from '../../src/react-chayns-file_input/component/FileInput';
import imageUpload from '../../src/utils/imageUpload';
import Button from '../../src/react-chayns-button/component/Button';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';

const FileInputExample = () => {
    const [images, setImages] = useState([]);
    const [displayPath, setDisplayPath] = useState('');

    const onChange = useCallback((validFiles) => {
        setImages(images.concat(validFiles.map((f) => ({ file: f }))));
    }, [images, setImages]);

    const onClick = useCallback(async () => {
        const data = await chayns.dialog.mediaSelect({ multiselect: true });
        setImages(images.concat(data.selection.map((url) => ({ url }))));
    }, [images, setImages]);

    const onDelete = useCallback((image, index) => {
        const img = images.slice();
        img.splice(index, 1);
        setImages(img);
    }, [images, setImages]);

    const onDragEnd = useCallback((imgs) => {
        setImages(imgs);
    }, [setImages]);

    const upload = useCallback(() => {
        images.forEach(async (image) => {
            const result = await imageUpload(image.file || image.url, 'componentsTestUpload', chayns.env.user.personId, chayns.env.site.id);
            console.log('Uploaded image', result);
            setDisplayPath(`${displayPath}${result.base}/${result.key}\n`);
        });
    }, [images, setDisplayPath]);

    return (
        <div>
            <FileInput
                style={{ marginBottom: '20px' }}
                stopPropagation
                items={[{
                    types: FileInput.typePresets.TSIMG_CLOUD, // only images are allowed
                    maxFileSize: 4194304, // max file size is 4 MB
                    maxNumberOfFiles: 0, // no limit for number of files
                    onChange,
                    content: { text: 'Bild hochladen' },
                }, {
                    onClick,
                    content: {
                        text: 'Bild auswählen',
                        icon: 'ts-image',
                    },
                }]}
            />
            <h3>Gallery with dragMode and deleteMode</h3>
            <Gallery
                images={images}
                deleteMode
                onDelete={onDelete}
                dragMode
                onDragEnd={onDragEnd}
                style={{ marginBottom: '30px' }}
            />
            <h3>Gallery with dragMode</h3>
            <Gallery
                images={images}
                dragMode
                onDragEnd={onDragEnd}
                style={{ marginBottom: '30px' }}
            />
            <h3>Gallery with deleteMode</h3>
            <Gallery
                images={images}
                deleteMode
                onDelete={onDelete}
                style={{ marginBottom: '30px' }}
            />
            <Button
                disabled={!images}
                onClick={upload}
            >
                Upload
            </Button>
            <p>{displayPath}</p>
            <FileInput
                items={[{
                    types: [FileInput.types.ALL],
                    onChange: console.log,
                    content: { text: 'Upload all' },
                }]}
            />
        </div>
    );
};

export default FileInputExample;
