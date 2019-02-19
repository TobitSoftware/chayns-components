/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';
import SmallWaitCursor from '../../react-chayns-smallwaitcursor/component/SmallWaitCursor';

export default class ImageContainer extends PureComponent {
    static propTypes = {
        index: PropTypes.number,
        image: PropTypes.string.isRequired,
        openImage: PropTypes.func.isRequired,
        moreImages: PropTypes.number,
        deleteMode: PropTypes.bool,
        onDelete: PropTypes.func,
        stopPropagation: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        index: 0,
        moreImages: 0,
        deleteMode: false,
        onDelete: null,
    };

    constructor(props) {
        super(props);
        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.openImage = this.openImage.bind(this);
        this.onReady = this.onReady.bind(this);
        this.setSize = this.setSize.bind(this);
        this.state = { height: 0, width: 0, ready: false };
    }

    componentDidMount() {
        this.setSize();
    }

    onReady() {
        this.setState({ ready: true });
    }

    setSize() {
        const height = this.itemRef.clientHeight;
        const width = this.itemRef.clientWidth;
        this.setState({ height, width });
        if (!(height && width)) {
            setTimeout(() => {
                this.setSize();
            }, 100);
        }
    }

    openImage() {
        const { index, openImage } = this.props;
        if (openImage) {
            openImage(index);
        }
    }

    deleteOnClick(e) {
        const {
            onDelete, index, image, stopPropagation
        } = this.props;
        if (onDelete) onDelete(image, index);
        if (stopPropagation) e.stopPropagation();
    }

    render() {
        const {
            image,
            moreImages,
            deleteMode,
        } = this.props;

        const {
            height, width, ready
        } = this.state;

        let url;
        if (height > 0 && width > 0) {
            url = image.isDataUrl ? image.url : chayns.utils.getScaledImageUrl(image.url, height, width);
        }

        return (
            <div
                className={classNames('gallery_item', { 'more-images': moreImages > 0 })}
                ref={ref => this.itemRef = ref}
                style={image.height / height > image.width / width
                    ? { flexDirection: 'column' }
                    : { flexDirection: 'row' }
                }
                data-more={(moreImages > 0) ? `+${moreImages}` : undefined}
                onClick={this.openImage}
            >
                <img
                    key="image"
                    alt=""
                    src={url}
                    className="gallery_item_inner"
                    style={image.height / height > image.width / width
                        ? {
                            width: '100%', height: 'auto', left: 0, right: 0
                        }
                        : {
                            width: 'auto', height: '100%', top: 0, bottom: 0
                        }
                    }
                    onLoad={this.onReady}
                />
                {
                    image.preview
                        ? [
                            <img
                                key="preview"
                                alt=""
                                src={image.preview}
                                className={classNames('gallery_item_inner', 'gallery_item_inner--preview', { 'gallery_item_inner--preview-ready': ready })}
                                style={image.height / height > image.width / width
                                    ? {
                                        width: '100%', height: 'auto', left: 0, right: 0
                                    }
                                    : {
                                        width: 'auto', height: '100%', top: 0, bottom: 0
                                    }
                                }
                                onLoad={this.onReady}
                            />,
                            <div className="gallery_item--wait_cursor" key="waitCursor">
                                <SmallWaitCursor show={!ready} showBackground={false}/>
                            </div>
                        ]
                        : null
                }
                {deleteMode && (
                    <div className="delete-icon" onClick={this.deleteOnClick} key="icon">
                        <Icon icon="ts-wrong"/>
                    </div>
                )}
            </div>
        );
    }
}
