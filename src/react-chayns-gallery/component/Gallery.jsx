/* eslint-disable no-param-reassign,no-await-in-loop,no-return-assign,react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from './Image';
import { getDataUrlFromFile } from '../utils/getDataUrl';
import './Gallery.scss';
import ImageContainer from './ImageContainer';

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
        onDragEnd: PropTypes.func,
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
        onDragEnd: null,
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

    componentDidUpdate(prevProps) {
        const { images } = this.props;
        if (prevProps.images !== images) {
            this.selectedElement.classList.remove('cc__gallery__image--active');
            this.lastDropzone.classList.remove('cc__gallery__image--show_dropzone');
            this.selectedElement = null;
        }
        return true;
    }

    onDown = (event, index, image) => {
        this.index = index;
        this.image = image;
        this.pageXStart = event.pageX;
        this.pageYStart = event.pageY;
        this.selectedElement = event.target.parentElement.parentElement.parentElement;
        this.selectedElementStartPosition = this.selectedElement.getBoundingClientRect();
        this.galleryStartPosition = this.galleryRef.current.getBoundingClientRect();
        this.galleryOffsetX = this.galleryStartPosition.left;
        this.galleryOffsetY = this.galleryStartPosition.top;
        this.offsetX = this.pageXStart - this.selectedElementStartPosition.left;
        this.offsetY = this.pageYStart - this.selectedElementStartPosition.top;

        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('mouseup', this.onUp);
        document.addEventListener('touchend', this.onUp);
        document.addEventListener('touchcancel', this.onUp);
    };

    onMove = (event) => {
        const { pageX, pageY } = event;
        const { clientWidth: galleryWidth } = this.galleryRef.current;
        const { clientHeight: itemHeight, clientWidth: itemWidth } = event.target.parentElement.parentElement.parentElement;

        // set selected element active
        if (!this.selectedElement.classList.contains('cc__gallery__image--active')) {
            this.selectedElement.classList.add('cc__gallery__image--active');
        }

        // move item
        this.selectedElement.style.left = `${pageX - this.galleryOffsetX - this.offsetX}px`;
        this.selectedElement.style.top = `${pageY - this.galleryOffsetY - this.offsetY}px`;

        // determine new position
        const itemsPerRow = Math.floor(galleryWidth / itemWidth);
        const middleX = pageX - this.galleryOffsetX - this.offsetX + (itemWidth / 2);
        const middleY = pageY - this.galleryOffsetY - this.offsetY + (itemHeight / 2);
        const row = Math.floor(middleY / itemHeight);
        const column = Math.floor(middleX / itemWidth);
        this.newPosition = (row * itemsPerRow) + column;

        // show corresponding dropzone
        let insertPosition = this.newPosition * 2; // dropzones and images are alternating
        if (this.newPosition > this.index) {
            insertPosition += 2;
        }

        const dropzone = this.galleryRef.current.children[insertPosition];
        if (this.lastDropzone && this.lastDropzone !== dropzone) {
            this.lastDropzone.classList.remove('cc__gallery__image--show_dropzone');
        }
        if (dropzone) {
            dropzone.classList.add('cc__gallery__image--show_dropzone');
        }
        this.lastDropzone = dropzone;
    };

    onUp = () => {
        document.removeEventListener('mousemove', this.onMove);
        document.removeEventListener('touchmove', this.onMove);
        document.removeEventListener('mouseup', this.onUp);
        document.removeEventListener('touchend', this.onUp);
        document.removeEventListener('touchcancel', this.onUp);

        if (this.lastDropzone) { // there's no lastDropzone if user hasn't moved
            const { onDragEnd, images } = this.props;
            const rect = this.lastDropzone.getBoundingClientRect();
            this.selectedElement.classList.add('cc__gallery__image--transition');
            this.selectedElement.style.left = `${rect.left - this.galleryOffsetX}px`;
            this.selectedElement.style.top = `${rect.top - this.galleryOffsetY}px`;
            const onTransitionEnd = () => {
                this.selectedElement.removeEventListener('transitionend', onTransitionEnd);
                this.selectedElement.classList.remove('cc__gallery__image--transition');

                if (onDragEnd) {
                    const image = images[this.index];
                    const newArray = images.slice();
                    newArray.splice(this.index, 1);
                    newArray.splice(this.newPosition, 0, image);
                    onDragEnd(newArray);
                }
            };
            this.selectedElement.addEventListener('transitionend', onTransitionEnd);
        } else {
            this.selectedElement.classList.remove('cc__gallery__image--active');
        }
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

        const dropzone = key => (
            <div key={key} id={key} className="cc__gallery__image cc__gallery__image--dropzone">
                <ImageContainer>
                    <div className="cc__gallery__image__dropzone chayns__background-color--101 chayns__border-color--300" />
                </ImageContainer>
            </div>
        );

        return (
            <div
                className={classNames('cc__gallery', className, { 'cc__gallery--delete-mode': deleteMode })}
                style={style}
                ref={this.galleryRef}
                key="gallery"
            >
                {
                    dropzone('dropzone')
                }
                {
                    images.map((image, index) => {
                        if (index < 4 || deleteMode) {
                            const tools = [];
                            if (dragMode) {
                                tools.push({
                                    icon: 'ts-bars',
                                    onDown: (event) => {
                                        this.onDown(event, index, image);
                                    },
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

                            return [
                                <div className="cc__gallery__image" id={`image${index}`} key={`imageDiv${index}`}>
                                    <ImageContainer
                                        tools={tools}
                                    >
                                        <Image
                                            key={`image${index}`}
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
                                </div>,
                                dropzone(`dropzone${index}`),
                            ];
                        }
                        return null;
                    })
                }
            </div>
        );
    }
}
