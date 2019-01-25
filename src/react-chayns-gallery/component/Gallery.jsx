/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageContainer from './ImageContainer';
import getTappWidth from '../../utils/tappWidth';

export default class Gallery extends Component {
    static propTypes = {
        urls: PropTypes.array.isRequired,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        deleteMode: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number,
        stopPropagation: PropTypes.bool,
    };

    static defaultProps = {
        onClick: chayns.openImage,
        onDelete: null,
        deleteMode: false,
        height: chayns.env.mobile ? 256 : 428,
        width: null,
        stopPropagation: false,
    };

    constructor() {
        super();
        this.openGallery = this.openGallery.bind(this);
        this.getBigImageUrls = this.getBigImageUrls.bind(this);
    }

    getBigImageUrls() {
        const { urls } = this.props;
        return urls.map((url) => {
            return chayns.utils.getScaledImageUrl(url, null, null, (chayns.env.isIOS && (chayns.env.isApp || chayns.env.isMyChaynsApp)));
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
            stopPropagation,
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
                                        stopPropagation={stopPropagation}
                                        key={url}
                                        url={chayns.utils.getScaledImageUrl(url, imgHeight, imgWidth)}
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
