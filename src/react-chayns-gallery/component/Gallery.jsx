import React from 'react';
import PropTypes from 'prop-types';
import MoreImages from './MoreImages';
import ImageContainer from './ImageContainer';

export default class Gallery extends React.Component {
    static propTypes = {
        urls: PropTypes.array.isRequired,
        height: PropTypes.number,
        width: PropTypes.number,
        onlyIcon: PropTypes.bool,
        onClick: PropTypes.func

    };
    static defaultProps = {
        height: 0,
        width: 0,
        onlyIcon: false,
        onClick: chayns.openImage
    };

    constructor() {
        super();
        this.openFirstImage = this.openGallery.bind(this, 0);
        this.openSecondImage = this.openGallery.bind(this, 1);
        this.openThirdImage = this.openGallery.bind(this, 2);

    }

    openGallery(start) {
        this.props.onClick(this.props.urls, start);
    }

    render() {
        const {urls, height, width, onlyIcon} = this.props;
        const count = urls.length;

        return (
            <div className="chayns-gallery" >
                <div className="gallery-grid">
                <ImageContainer
                    className="gallery_item"
                    url={urls[0]}
                    onClick={this.openFirstImage}
                />
                    {count > 1 ?
                <ImageContainer
                    className="gallery_item"
                    url={urls[1]}
                    onClick={this.openSecondImage}
                /> : ''}
                    {count > 2 ?
                <ImageContainer
                    className="gallery_item"
                    url={urls[2]}
                    onClick={this.openThirdImage}
                >
                    {count > 3 ?
                        <MoreImages
                            count={count - 3}
                            onlyIcon={onlyIcon}
                        /> : ''
                    }
                </ImageContainer> : ''}
                </div>
            </div>
        );
    }
}
