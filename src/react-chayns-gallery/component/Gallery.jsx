/* eslint-disable no-param-reassign,no-await-in-loop,no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageContainer from './ImageContainer';
import { getImageMetaDataFromApi, getImageMetaDataFromPreview } from '../utils/getImageMetaData';
import getDataUrl from '../utils/getDataUrl';

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

    static getBigImageUrls(images) {
        return images.map((image) => {
            if (image.isDataUrl) return image.url;
            return chayns.utils.getScaledImageUrl(image.url, null, null, (chayns.env.isIOS && (chayns.env.isApp || chayns.env.isMyChaynsApp)));
        });
    }

    constructor() {
        super();
        this.openGallery = this.openGallery.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.state = { images: [], height: 0 };
    }

    componentWillMount() {
        const { images } = this.props;
        this.updateImages([], images);
    }

    componentDidMount() {
        this.setState({ height: this.galleryRef.clientWidth });
    }

    componentDidUpdate(prevProps, prevState) {
        const { images: propImages } = this.props;
        const { images: stateImages } = prevState;
        if (prevProps.images !== propImages) {
            this.updateImages(stateImages, propImages);
        }
    }

    async updateImages(stateImages, newImages) {
        const newStateImages = [];
        for (let index = 0; index < newImages.length; index += 1) {
            const image = newImages[index];
            if (image.url) {
                const result = stateImages.find(img => !img.isDataUrl && img.url === image.url);
                if (result) {
                    newStateImages.push(result);
                    stateImages.shift(result);
                } else {
                    let newImage = image;
                    if (newImage.preview && !newImage.preview.startsWith('data:image/*;base64,')) {
                        newImage.preview = `data:image/*;base64,${newImage.preview}`;
                    }
                    if (!newImage.width || !newImage.height) {
                        let meta;
                        if (newImage.preview) {
                            meta = await getImageMetaDataFromPreview(newImage.preview);// In this case, the size is not the real size. Size can only be used to calculate the image orientation
                        } else if (newImage.url.indexOf('tsimg.cloud') >= 0) {
                            meta = await getImageMetaDataFromApi(newImage.url);
                        } else {
                            meta = await getImageMetaDataFromPreview(chayns.utils.getScaledImageUrl(newImage.url, 10)); // In this case, the size is not the real size. Size can only be used to calculate the image orientation
                        }
                        newImage = { ...meta, ...newImage };
                    }
                    newStateImages.push({ ...newImage, ...{ index, key: Math.random() } });
                }
            } else {
                const result = stateImages.find(img => img.isDataUrl && img.file === image.file);
                if (result) {
                    newStateImages.push(result);
                } else {
                    let newImage = image;
                    const dataUrl = await getDataUrl(newImage.file);
                    newImage = { ...newImage, ...{ url: dataUrl, isDataUrl: true } };
                    if (!newImage.width || !newImage.height) {
                        const meta = await getImageMetaDataFromPreview(newImage.url);
                        newImage = { ...meta, ...newImage };
                    }
                    newStateImages.push({ ...newImage, ...{ index, key: Math.random() } });
                }
            }
        }
        this.setState({ images: newStateImages });
    }

    openGallery(start) {
        const { onClick, deleteMode } = this.props;
        const { images } = this.state;
        if (!deleteMode) {
            onClick(Gallery.getBigImageUrls(images), start);
        }
    }

    render() {
        const {
            height,
            width,
            onDelete,
            deleteMode,
            className,
            stopPropagation,
        } = this.props;
        const { style: propStyle } = this.props;
        const { images, height: stateHeight } = this.state;
        const style = { ...propStyle };

        let styleHeight;
        if (!deleteMode) {
            if (height) {
                styleHeight = height;
            } else {
                styleHeight = stateHeight;
            }
            style.height = `${styleHeight}px`;
        }
        if (width) {
            style.width = width;
        }
        const numberOfImages = images.length;
        return (
            <div
                className={classNames('chayns-gallery', className)}
                style={style}
                ref={ref => this.galleryRef = ref}
                key="gallery"
            >
                <div className={classNames('gallery-grid', { 'delete-mode': deleteMode })} key="grid">
                    {
                        images.map((image, index) => {
                            if (index <= 3 || deleteMode) {
                                return (
                                    <ImageContainer
                                        stopPropagation={stopPropagation}
                                        key={`image${image.key}`}
                                        image={image}
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
