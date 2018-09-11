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
    }

    openGallery(start) {
        const { onClick, urls, deleteMode } = this.props;
        if(!deleteMode) {
            onClick(urls, start);
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
        const style = {};
        if (width) {
            style.width = `${width}px`;
        }
        if (!deleteMode) {
            if(height) {
                style.height = `${height}px`;
            } else if(chayns.env.mobile) {
                style.height = '256px';
            } else {
                style.height = '428px';
            }
        }
        return (
            <div className="chayns-gallery" style={{ height: `${styleHeight}px`, width: width ? `${width}px` : undefined }}>
                <div className={classNames('gallery-grid', { 'delete-mode': deleteMode })}>
                    {
                        urls.map((url, index) => {
                            if (index <= 3 || deleteMode) {
                                return (
                                    <ImageContainer
                                        key={url}
                                        url={url}
                                        index={index}
                                        openImage={this.openImage}
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
