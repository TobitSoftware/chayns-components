/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ImageContainer extends React.PureComponent {
    static propTypes = {
        index: PropTypes.number,
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        moreImages: PropTypes.number,
        deleteMode: PropTypes.bool,
        onDelete: PropTypes.func,
        openImage: PropTypes.func
    };

    static defaultProps = {
        index: 0,
        moreImages: 0,
        deleteMode: false,
        openImage: null,
        onDelete: null
    };

    constructor(props) {
        super(props);
        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.openImage = this.openImage.bind(this);
    }


    deleteOnClick() {
        const { onDelete, index, url } = this.props;
        if(onDelete) {
            onDelete(url, index);
        }
    }

    openImage() {
        const { index, openImage } = this.props;
        if(openImage) {
            openImage(index);
        }
    }

    render() {
        const {
            url, moreImages, deleteMode
        } = this.props;
        return (
            <div className={classNames('gallery_item', { 'delete-mode': deleteMode })}>
                <div
                    className={classNames('gallery_item_inner', { 'more-images': moreImages > 0 })}
                    style={{ backgroundImage: `url(${url})` }}
                    onClick={this.openImage}
                    data-more={(moreImages > 0) ? `+${moreImages}` : undefined}
                >
                    {
                        deleteMode
                            ? (
                                <i
                                    className="fa fa-times delete-icon"
                                    aria-hidden="true"
                                    onClick={this.deleteOnClick}
                                />
                            )
                            : null
                    }
                </div>
            </div>
        );
    }
}
