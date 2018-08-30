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
        onDelete: PropTypes.func
    };

    static defaultProps = {
        index: 0,
        moreImages: 0,
        deleteMode: false,
        onDelete: () => {
        }
    };

    constructor(props) {
        super(props);
        this.deleteOnClick = this.deleteOnClick.bind(this);
    }


    deleteOnClick() {
        const { onDelete, index, url } = this.props;
        onDelete(url, index);
    }

    render() {
        const {
            url, onClick, moreImages, deleteMode
        } = this.props;
        return (
            <div className={classNames('gallery_item', { 'delete-mode': deleteMode })}>
                <div
                    className={classNames('gallery_item_inner', { 'more-images': moreImages > 0 })}
                    style={{ backgroundImage: `url(${url})` }}
                    onClick={onClick}
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
