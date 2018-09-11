import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageContainer from './ImageContainer';

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
        height: null,
        width: null
    };

    constructor() {
        super();
        this.openImage = this.openGallery.bind(this);
        this.scaledImage = this.getScaledImageUrl.bind(this);
        this.bigImages = this.getBigImages.bind(this);
    }

    getScaledImageUrl(url, shortEdgeSize) {
        if (url.indexOf('tsimg.space') >= 0 && (url.indexOf('jpg') >= 0 || url.indexOf('jpeg') >= 0 || url.indexOf('png') >= 0)) {
            return url
                .replace('.jpg', `_s${shortEdgeSize}-mshortedgescale.jpg`)
                .replace('.jpeg', `_s${shortEdgeSize}-mshortedgescale.jpeg`)
                .replace('.png', `_s${shortEdgeSize}-mshortedgescale.png`);
        }
        return url;
    }

    getBigImages(urls) {
        const bigUrls = [];
        urls.forEach((url) => {
            // eslint-disable-next-line no-restricted-globals
            bigUrls.push(this.scaledImage(url, screen.availHeight * 0.9));
        });
        return bigUrls;
    }

    openGallery(start) {
        const { onClick, urls, deleteMode } = this.props;
        if (!deleteMode) {
            onClick(this.bigImages(urls), start);
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
        if (!deleteMode) {
            if (height) {
                styleHeight = height;
            } else if (chayns.env.mobile) {
                styleHeight = 256;
            } else {
                styleHeight = 428;
            }
        }
        const numberOfImages = urls.length;
        return (
            <div className="chayns-gallery" style={{ height: `${styleHeight}px`, width: width ? `${width}px` : undefined }}>
                <div className={classNames('gallery-grid', { 'delete-mode': deleteMode })}>
                    {
                        urls.map((url, index) => {
                            if (index <= 3 || deleteMode) {
                                let scaleHeight = 150;
                                if(!deleteMode) {
                                    if (index <= 2 && numberOfImages <= 2) {
                                        scaleHeight = styleHeight;
                                    } else if (index === 0) {
                                        scaleHeight = parseInt((styleHeight * 2) / 3, 10);
                                    } else if (index < 4) {
                                        scaleHeight = parseInt(styleHeight / 3, 10);
                                    }
                                }

                                return (
                                    <ImageContainer
                                        key={url}
                                        url={this.scaledImage(url, scaleHeight)}
                                        index={index}
                                        openImage={this.openImage}
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
