import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageContainer from './ImageContainer';
import browserSupportsWebp from '../../utils/webpSupport';
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
        this.getImageUrls = this.getImageUrls.bind(this);
        this.state = { smallImages: [], bigUrls: [] };
    }

    static async getScaledImageUrl(url, height, width, preventWebp) {
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
            let support;
            try {
                support = !preventWebp && await browserSupportsWebp();
            } catch (err) {
                if(window.debugLevel >= 3) {
                    console.debug('no webp support', err);
                }
            }
            if (height && width) {
                url = url.replace(imgType[0], `_h${height}-w${width}${imgType[0]}`);
                if (support) {
                    return url.replace(imgType[0], `-fwebp${imgType[0]}`);
                }
            }
            if (support) {
                return url.replace(imgType[0], `_fwebp${imgType[0]}`);
            }
        }
        return url;
    }

    async getImageUrls() {
        const {
            urls, width, height, deleteMode
        } = this.props;
        const bigUrls = [];
        const smallImages = [];
        const numberOfImages = urls.length;
        for (let index = 0; index < urls.length; index += 1) {
            const url = urls[index];
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
                    if(deleteMode) {
                        imgWidth = imgHeight;
                    }
                }
            }
            bigUrls.push(await Gallery.getScaledImageUrl(url, null, null, (chayns.env.isIOS && (chayns.env.isApp || chayns.env.isMyChaynsApp))));
            smallImages.push({
                url: await Gallery.getScaledImageUrl(url, imgHeight, imgWidth),
                height: imgHeight,
                width: imgWidth
            });
            if (bigUrls.length === urls.length && smallImages.length === urls.length) {
                this.setState({ bigUrls, smallImages });
            }
        }
        if(urls.length === 0) {
            this.setState({ bigUrls: [], smallImages: [] });
        }
    }

    openGallery(start) {
        const { onClick, deleteMode } = this.props;
        const { bigUrls } = this.state;
        if (!deleteMode) {
            onClick(bigUrls, start);
        }
    }

    componentDidMount() {
        this.getImageUrls();
    }

    componentWillReceiveProps() {
        this.getImageUrls();
    }

    render() {
        const {
            urls,
            height,
            width,
            onDelete,
            deleteMode,
        } = this.props;
        const {
            smallImages
        } = this.state;
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
                        smallImages.map((image, index) => {
                            if (index <= 3 || deleteMode) {
                                return (
                                    <ImageContainer
                                        key={image.url}
                                        url={image.url}
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
