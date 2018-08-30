/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ImageContainer = ({
                            className,
                            url,
                            onClick,
                            moreImages,
                            onDelete,
                            deleteMode,
                            index
                        }) => {
    return (
        <div className={classNames(className, { deleteMode })}>
            <div
                className={classNames('gallery_item_inner', { moreImages: moreImages > 0 })}
                style={{ backgroundImage: `url(${url})` }}
                onClick={onClick}
                data-more={(moreImages > 0) ? `+${moreImages}` : undefined}
            >
                {
                    deleteMode
                        ? (
                            <i
                                className="fa fa-times deleteIcon"
                                aria-hidden="true"
                                onClick={() => {
                                    onDelete(url, index);
                                }}
                            />
                        )
                        : null
                }
            </div>
        </div>
    );
};

ImageContainer.propTypes = {
    className: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    moreImages: PropTypes.number,
    deleteMode: PropTypes.bool,
    onDelete: PropTypes.func,
    index: PropTypes.number
};

ImageContainer.defaultProps = {
    moreImages: 0,
    deleteMode: false,
    onDelete: () => {
    },
    index: 0
};

export default ImageContainer;
