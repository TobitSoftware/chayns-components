/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import Icon from '../../react-chayns-icon/component/Icon';

export default class ImageContainer extends PureComponent {
    static propTypes = {
        index: PropTypes.number,
        url: PropTypes.string.isRequired,
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
    }


    deleteOnClick(e) {
        const {
            onDelete, index, url, stopPropagation
        } = this.props;
        if (onDelete) onDelete(url, index);
        if (stopPropagation) e.stopPropagation();
    }

    openImage() {
        const { index, openImage } = this.props;
        if (openImage) {
            openImage(index);
        }
    }

    render() {
        const {
            url,
            moreImages,
            deleteMode,
        } = this.props;

        return (
            <div className="gallery_item">
                <div
                    className={classNames('gallery_item_inner', { 'more-images': moreImages > 0 })}
                    style={{ backgroundImage: `url(${url})` }}
                    onClick={this.openImage}
                    data-more={(moreImages > 0) ? `+${moreImages}` : undefined}
                >
                    {deleteMode && (
                        <div className="delete-icon" onClick={this.deleteOnClick}>
                            <Icon icon={faTimes}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
