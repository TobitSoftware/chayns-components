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
        this.openGallery = this.openGallery.bind(this);
    }

    static getScaledImageUrl(url, shortEdgeSize) {
        if (url.indexOf('tsimg.space') >= 0) {
            if (url.indexOf('jpg') >= 0) {
                return url.replace('.jpg', `_s${shortEdgeSize}-mshortedgescale.jpg`);
            }
            if (url.indexOf('jpeg') >= 0) {
                return url.replace('.jpeg', `_s${shortEdgeSize}-mshortedgescale.jpeg`);
            }
            if (url.indexOf('png') >= 0) {
                return url.replace('.png', `_s${shortEdgeSize}-mshortedgescale.png`);
            }
        }
        return url;
    }

    static getBigImages(urls) {
        const bigUrls = [];
        urls.forEach((url) => {
            // eslint-disable-next-line no-restricted-globals
            bigUrls.push(Gallery.getScaledImageUrl(url, screen.availHeight * 0.9));
        });
        return bigUrls;
    }

    openGallery(start) {
        const { onClick, urls, deleteMode } = this.props;
        if (!deleteMode) {
            onClick(Gallery.getBigImages(urls), start);
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
                            if (index <= 3 || deleteMode) {
                                let scaleHeight = 150;
                                if (!deleteMode) {
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
                                        url={Gallery.getScaledImageUrl(url, scaleHeight)}
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
