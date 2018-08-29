import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        onDelete: () => {
        },
        deleteMode: false,
        height: null,
        width: null
    };

    constructor() {
        super();
        this.openImage = this.openGallery.bind(this);
    }

    openGallery(start) {
        const { onClick, urls } = this.props;

        onClick(urls, start);
    }

    render() {
        const {
            urls, height, width, onDelete, deleteMode
        } = this.props;
        const style = {};
        if (width) {
            style.width = `${width}px`;
        }
        if (!deleteMode) {
            style.height = (height) ? `${height}px` : (chayns.env.isMobile) ? '256px' : '428px';
        }
        return (
            <div className="chayns-gallery" style={style}>
                <div className="gallery-grid">
                    {
                        urls.map((url, index) => {
                            if (index <= 3 || deleteMode) {
                                return (
                                    <ImageContainer
                                        key={url + index}
                                        className="gallery_item"
                                        url={url}
                                        onClick={() => {
                                            if(!deleteMode) {
                                                this.openImage(index);
                                            }
                                        }}
                                        onDelete={onDelete}
                                        deleteMode={deleteMode}
                                        moreImages={(index === 3 && !deleteMode) ? urls.length - 1 - index : 0}
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
