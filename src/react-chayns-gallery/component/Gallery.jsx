/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageContainer from './ImageContainer';
import getTappWidth from '../../utils/tappWidth';

export default class Gallery extends Component {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
            url: PropTypes.string.isRequired,
            width: PropTypes.number,
            height: PropTypes.number,
            preview: PropTypes.string,
        }), PropTypes.shape({
            file: PropTypes.instanceOf(File).isRequired,
            width: PropTypes.number,
            height: PropTypes.number,
        })])).isRequired,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        deleteMode: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number,
        className: PropTypes.string,
        style: PropTypes.object,
        stopPropagation: PropTypes.bool,
    };

    static defaultProps = {
        onClick: chayns.openImage,
        onDelete: null,
        deleteMode: false,
        height: null,
        width: '100%',
        className: null,
        style: {},
        stopPropagation: false,
    };

    static getDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    static getImageMetaDataFromApi(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, {
                    method: 'HEAD'
                });
                const height = parseInt(response.headers.get('x-amz-meta-height'), 10);
                const width = parseInt(response.headers.get('x-amz-meta-width'), 10);
                if (height && width) {
                    resolve({ height, width });
                }else{
                    reject();
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    static getImageMetaDataFromPreview(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const image = new Image();
                image.src = url;
                image.onload = () => {
                    const height = image.naturalHeight;
                    const width = image.naturalWidth;
                    if (height && width) {
                        resolve({ height, width });
                    }else{
                        reject();
                    }
                };
            } catch (err) {
                reject(err);
            }
        });
    }

    constructor() {
        super();
        this.openGallery = this.openGallery.bind(this);
        this.getBigImageUrls = this.getBigImageUrls.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.state = { images: [] };
    }

    componentWillMount() {
        const { images } = this.props;
        this.updateImages([], images);
    }

    shouldComponentUpdate(nextProps) {
        const { images: propImages } = this.props;
        const { images: stateImages } = this.state;

        if (nextProps.images !== propImages) {
            this.updateImages(stateImages, nextProps.images);
        }
    }

    getBigImageUrls() {
        const { images } = this.state;
        return images.map((image) => {
            if (image.isDataUrl) return image.url;
            return chayns.utils.getScaledImageUrl(image.url, null, null, (chayns.env.isIOS && (chayns.env.isApp || chayns.env.isMyChaynsApp)));
        });
    }

    updateImages(stateImages, newImages) {
        let newStateImages = [];
        newImages.forEach(async (image, index) => {
            if (image.url) {
                const result = stateImages.find(img => !img.isDataUrl && img.url === image.url);
                if (result) {
                    newStateImages.push(result);
                } else {
                    let newImage = image;
                    if (newImage.preview) {
                        newImage.preview = `data:image/*;base64,${newImage.preview}`;
                    }
                    if (!newImage.width || !newImage.height) {
                        let meta;
                        if(newImage.preview) {
                            meta = await Gallery.getImageMetaDataFromPreview(newImage.preview);// In this case, the size is not the real size. Size can only be used to calculate the image orientation
                        } else if(newImage.url.indexOf('tsimg.cloud') >= 0) {
                            meta = await Gallery.getImageMetaDataFromApi(newImage.url);
                        } else {
                            meta = await Gallery.getImageMetaDataFromPreview(chayns.utils.getScaledImageUrl(newImage.url, 10)); // In this case, the size is not the real size. Size can only be used to calculate the image orientation
                        }
                        newImage = { ...meta, ...newImage, ...{ index } };
                    }
                    newStateImages.push(newImage);
                }
            } else {
                const result = stateImages.find(img => img.isDataUrl && img.file === image.file);
                if (result) {
                    newStateImages.push(result);
                } else {
                    let newImage = image;
                    const dataUrl = await Gallery.getDataUrl(newImage.file);
                    newImage = { ...newImage, ...{ url: dataUrl, isDataUrl: true } };
                    if (!newImage.width || !newImage.height) {
                        const meta = await Gallery.getImageMetaDataFromPreview(newImage.url);
                        newImage = { ...meta, ...newImage, ...{ index } };
                    }
                    newStateImages.push(newImage);
                }
            }
        });
        newStateImages = newStateImages.sort((a, b) => a.index > b.index);
        this.setState({ images: newStateImages });
    }

    openGallery(start) {
        const { onClick, deleteMode } = this.props;
        if (!deleteMode) {
            onClick(this.getBigImageUrls(), start);
        }
    }

    render() {
        const {
            images,
            height,
            width,
            onDelete,
            deleteMode,
            className,
            stopPropagation,
        } = this.props;
        const { style } = this.props;
        let styleHeight;
        if (!deleteMode) {
            if (height) {
                styleHeight = height;
            } else if (chayns.env.mobile) {
                styleHeight = 256;
            } else {
                styleHeight = 428;
            }
            style.height = `${styleHeight}px`;
        }
        if (width) {
            style.width = width;
        }
        const numberOfImages = images.length;
        return (
            <div className={classNames('chayns-gallery', className)} style={style}>
                <div className={classNames('gallery-grid', { 'delete-mode': deleteMode })}>
                    {
                        images.map((image, index) => {
                            let imgWidth = width || getTappWidth();
                            let imgHeight = height;
                            if (!deleteMode && (numberOfImages === 2 || (numberOfImages === 3 && index > 0))) {
                                imgWidth /= 2;
                            } else if (index > 0) {
                                imgWidth /= 3;
                            }
                            if (numberOfImages > 2 || deleteMode) {
                                if (index === 0 && !deleteMode) {
                                    imgHeight = imgHeight * 2 / 3;
                                } else {
                                    imgHeight /= 3;
                                    if (deleteMode) {
                                        imgWidth = imgHeight;
                                    }
                                }
                            }

                            if (index <= 3 || deleteMode) {
                                return (
                                    <ImageContainer
                                        stopPropagation={stopPropagation}
                                        key={image.url.substring(0, 50)}
                                        url={image.isDataUrl ? image.url : chayns.utils.getScaledImageUrl(image.url, imgHeight, imgWidth)}
                                        index={index}
                                        openImage={this.openGallery}
                                        onDelete={onDelete}
                                        deleteMode={deleteMode}
                                        moreImages={(index === 3 && !deleteMode) ? numberOfImages - 1 - index : 0}
                                    />
                                );
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        );
    }
}
