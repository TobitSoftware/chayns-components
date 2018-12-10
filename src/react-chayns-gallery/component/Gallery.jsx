/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import supportsWebP from 'supports-webp';
import ImageContainer from './ImageContainer';
import getTappWidth from '../../utils/tappWidth';

export default class Gallery extends Component {
    static propTypes = {
        urls: PropTypes.array.isRequired,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        deleteMode: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number
    };

    static defaultProps = {
        onClick: chayns.openImage,
        onDelete: null,
        deleteMode: false,
        height: chayns.env.mobile ? 256 : 428,
        width: null
    };

    constructor() {
        super();
        this.openGallery = this.openGallery.bind(this);
        this.getBigImageUrls = this.getBigImageUrls.bind(this);
    }

    static getScaledImageUrl(url, height, width, preventWebp) {
        height = height ? Math.floor(height * window.devicePixelRatio) : null;
        width = width ? Math.floor(width * window.devicePixelRatio) : null;
        const shortEdgeSize = height > width ? height : width;
        const regexImgType = /[.](jpg|jpeg|png)/;
        const regexImgService = /(tsimg.space|tsimg.cloud)/;
        const imgType = url.match(regexImgType);
        const imgService = url.match(regexImgService);

        if (height && width && imgService && imgService[0] === 'tsimg.space' && imgType) {
            return url.replace(imgType[0], `_s${shortEdgeSize}-mshortedgescale${imgType[0]}`);
        }
        if (imgService && imgService[0] === 'tsimg.cloud' && imgType) {
            let webpSupport;
            try {
                webpSupport = !preventWebp && supportsWebP;
            } catch (err) {
                webpSupport = false;
            }
            if (height && width) {
                url = url.replace(imgType[0], `_h${height}-w${width}${imgType[0]}`);
                if (webpSupport) {
                    return url.replace(imgType[0], `-fwebp${imgType[0]}`);
                }
            }
            if (webpSupport) {
                return url.replace(imgType[0], `_fwebp${imgType[0]}`);
            }
        }
        return url;
    }

    getBigImageUrls() {
        const { urls } = this.props;
        return urls.map((url) => {
            return Gallery.getScaledImageUrl(url, null, null, (chayns.env.isIOS && (chayns.env.isApp || chayns.env.isMyChaynsApp)));
        });
    }

    openGallery(start) {
        const { onClick, deleteMode } = this.props;
        if (!deleteMode) {
            onClick(this.getBigImageUrls(), start);
        }
    }

    render() {
        const {
            urls,
            height,
            width,
            onDelete,
            deleteMode,
        } = this.props;
        let styleHeight;
        const style = {};
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
        const numberOfImages = urls.length;
        return (
            <div className="chayns-gallery" style={style}>
                <div className={classNames('gallery-grid', { 'delete-mode': deleteMode })}>
                    {
                        urls.map((url, index) => {
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
                                        key={url}
                                        url={Gallery.getScaledImageUrl(url, imgHeight, imgWidth)}
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
