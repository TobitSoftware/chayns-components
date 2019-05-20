/* eslint-disable no-param-reassign,no-await-in-loop,no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from './Image';
import { getDataUrlFromFile } from '../utils/getDataUrl';
import './Gallery.scss';
import ImageContainer from './ImageContainer';
import Dropzone from './Dropzone';

export default class Gallery extends Component {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.shape({
                url: PropTypes.string.isRequired,
            }),
            PropTypes.shape({
                file: PropTypes.instanceOf(File).isRequired,
            }),
            PropTypes.string,
            PropTypes.instanceOf(File),
        ]).isRequired).isRequired,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        deleteMode: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number,
        className: PropTypes.string,
        style: PropTypes.object,
        stopPropagation: PropTypes.bool,
        dragMode: PropTypes.bool,
    };

    static defaultProps = {
        onClick: chayns.openImage,
        onDelete: null,
        deleteMode: false,
        height: null,
        width: null,
        className: null,
        style: {},
        stopPropagation: false,
        dragMode: false,
    };

    static getBigImageUrls(images) {
        return images.map((image) => {
            const img = image.url || image.file || image;
            return typeof img === 'string' ? img : getDataUrlFromFile(img);
        });
    }

    constructor(props) {
        super(props);
        this.galleryRef = React.createRef();
    }

    onDown = (event) => {
        this.clientXStart = event.clientX;
        this.clientYStart = event.clientY;
        this.selectedElement = event.target.parentElement.parentElement;


        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('mouseup', this.onUp);
        document.addEventListener('touchend', this.onUp);
        document.addEventListener('touchcancel', this.onUp);
    };

    onMove = (event) => {
        console.log(event.clientX, this.clientXStart);
        this.selectedElement.style.transform = `translate(${event.clientX - this.clientXStart}px,${event.clientY - this.clientYStart}px)`;
    };

    onUp = (event) => {
        this.clientXStart = null;
        this.clientYStart = null;
        this.selectedElement = null;


        document.removeEventListener('mousemove', this.onMove);
        document.removeEventListener('touchmove', this.onMove);
        document.removeEventListener('mouseup', this.onUp);
        document.removeEventListener('touchend', this.onUp);
        document.removeEventListener('touchcancel', this.onUp);
    };

    render() {
        const {
            height,
            width,
            onDelete,
            deleteMode,
            dragMode,
            className,
            stopPropagation,
            onClick,
            images,
        } = this.props;
        const { style: propStyle } = this.props;
        const style = { ...propStyle };

        let styleHeight;
        if (!deleteMode) {
            if (height) {
                styleHeight = height;
            } else {
                styleHeight = 420;
            }
            style.height = `${styleHeight}px`;
        }
        if (width) {
            style.width = width;
        }
        const numberOfImages = images.length;


        return (
            <div
                className={classNames('cc__gallery', className, { 'cc__gallery--delete-mode': deleteMode })}
                style={style}
                ref={this.galleryRef}
                key="gallery"
            >
                {
                    images.map((image, index) => {
                        if (index < 4 || deleteMode) {
                            const tools = [];
                            if (dragMode) {
                                tools.push({
                                    icon: 'ts-bars',
                                    onDown: this.onDown,
                                });
                            }
                            if (deleteMode) {
                                tools.push({
                                    icon: 'ts-wrong',
                                    onClick: () => {
                                        onDelete(image, index);
                                    },
                                });
                            }

                            return (
                                <div className="cc__gallery__image">
                                    <ImageContainer
                                        tools={tools}
                                    >
                                        <Image
                                            key={index}
                                            image={image.url || image.file || image}
                                            moreImages={(index === 3 && !deleteMode) ? numberOfImages - 1 - index : 0}
                                            onClick={
                                                (!deleteMode && !dragMode)
                                                    ? (event) => {
                                                        if (stopPropagation) event.stopPropagation();
                                                        onClick(Gallery.getBigImageUrls(images), index);
                                                    }
                                                    : null
                                            }
                                            className="cc__gallery__image--cover"
                                        />
                                    </ImageContainer>
                                </div>
                            );
                        }
                        return null;
                    })
                }
                <div className="cc__gallery__image">
                    <ImageContainer>
                        <Dropzone />
                    </ImageContainer>
                </div>
            </div>
        );
    }
}
