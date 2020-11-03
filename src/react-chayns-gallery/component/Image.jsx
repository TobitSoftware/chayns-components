/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign,react/forbid-prop-types */
import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SmallWaitCursor from '../../react-chayns-smallwaitcursor/component/SmallWaitCursor';
import { isString } from '../../utils/is';
import { isServer } from '../../utils/isServer';
import { getDataUrlFromBase64, getDataUrlFromFile } from '../utils/getDataUrl';
import {
    getImageMetaDataFromApi,
    getImageMetaDataFromPreview,
} from '../utils/getImageMetaData';
import getOrientation from '../utils/getOrientation';
import './Image.scss';

export default class Image extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            imageUrl: null,
            metaData: null,
            elementDimensions: null,
            rotate: 0,
            mirror: false,
        };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.init();
        }
    }

    getElementDimensions = () => {
        this.setState({
            elementDimensions: {
                height: Math.ceil(this.imageRef.current.clientHeight / 50) * 50,
                width: Math.ceil(this.imageRef.current.clientWidth / 50) * 50,
            },
        });
    };

    init = async () => {
        // set url and metadata
        this.getElementDimensions();

        const { image, styleLandscape, stylePortrait } = this.props;

        if (isString(image)) {
            // url
            if (Image.imageMetaData[image]) {
                // use cached metadata
                this.setState({
                    metaData: Image.imageMetaData[image],
                    imageUrl: image,
                });
            } else if (image.indexOf('tsimg.cloud') >= 0) {
                // get preview and dimensions from tsimg.cloud
                const metaData = await getImageMetaDataFromApi(image);
                Image.imageMetaData[image] = metaData;
                this.setState({
                    metaData,
                    imageUrl: image,
                });
            } else if (styleLandscape || stylePortrait) {
                // get dimensions if needed
                const metaData = await getImageMetaDataFromPreview(image);
                Image.imageMetaData[image] = metaData;
                this.setState({
                    metaData,
                    imageUrl: image,
                });
            } else {
                // set only the image url
                this.setState({ imageUrl: image });
            }
        } else {
            // file
            const cacheId = `##FILE##${image.name}${image.lastModified}${image.size}`;
            if (Image.imageMetaData[cacheId]) {
                // use cache
                this.setState(Image.imageMetaData[cacheId]);
            } else {
                // get dataUrl, metaData and exifData and set cache
                const imageUrl = await getDataUrlFromFile(image);
                const newImage = { imageUrl };
                const exifData = await getOrientation(image);
                if (exifData) {
                    newImage.mirror = exifData.mirrored;
                    newImage.rotate = exifData.rotation * -1;
                }
                if (styleLandscape || stylePortrait) {
                    // get dimensions if needed
                    newImage.metaData = await getImageMetaDataFromPreview(
                        imageUrl
                    );
                }
                Image.imageMetaData[cacheId] = newImage;
                this.setState(newImage);
            }
        }
    };

    onReady = () => {
        this.setState({ ready: true });
    };

    render() {
        const {
            moreImages,
            onClick,
            className,
            classNameLandscape,
            classNamePortrait,
            style,
            styleLandscape,
            stylePortrait,
            preventParams,
        } = this.props;

        const {
            metaData,
            imageUrl,
            ready,
            elementDimensions,
            mirror,
            rotate,
        } = this.state;

        let format = 0;
        if (metaData) {
            format =
                metaData.width > metaData.height
                    ? Image.format.LANDSCAPE
                    : Image.format.PORTRAIT;
        }

        return (
            <div
                className={classNames('cc__image', className, {
                    'cc__image--more-images': moreImages > 0,
                    'cc__image--ready': ready,
                    'cc__image--landscape': format === Image.format.LANDSCAPE,
                    'cc__image--portrait': format === Image.format.PORTRAIT,
                    [classNameLandscape]: format === Image.format.LANDSCAPE,
                    [classNamePortrait]: format === Image.format.PORTRAIT,
                })}
                ref={this.imageRef}
                style={{
                    ...style,
                    ...(format === Image.format.LANDSCAPE
                        ? styleLandscape
                        : null),
                    ...(format === Image.format.PORTRAIT
                        ? stylePortrait
                        : null),
                }}
                data-more={moreImages > 0 ? `+${moreImages}` : undefined}
            >
                {imageUrl ? (
                    <img
                        onClick={onClick}
                        key="image"
                        alt=""
                        src={
                            preventParams === true
                                ? imageUrl
                                : chayns.utils.getScaledImageUrl(
                                      imageUrl,
                                      !preventParams.height &&
                                          elementDimensions.height,
                                      !preventParams.width &&
                                          elementDimensions.width,
                                      preventParams.format
                                  )
                        }
                        className={classNames('cc__image__img', {
                            'cc__image--clickable': onClick,
                        })}
                        onLoad={this.onReady}
                        style={{
                            transform:
                                (mirror ? 'scaleX(-1) ' : '') +
                                (rotate ? `rotateZ(${rotate}deg)` : ''),
                        }}
                    />
                ) : null}
                {!ready && metaData && metaData.preview
                    ? [
                          <img
                              onClick={onClick}
                              key="preview"
                              alt=""
                              src={getDataUrlFromBase64(metaData.preview)}
                              className={classNames('cc__image__preview', {
                                  'cc__image--clickable': onClick,
                              })}
                          />,
                          <div
                              className="cc__image__wait-cursor"
                              key="waitCursor"
                          >
                              <SmallWaitCursor
                                  show={!ready}
                                  showBackground={false}
                              />
                          </div>,
                      ]
                    : null}
            </div>
        );
    }
}

Image.format = {
    LANDSCAPE: 1,
    PORTRAIT: 2,
};

Image.imageMetaData = {};

Image.propTypes = {
    // eslint-disable-next-line react/require-default-props
    image: isServer()
        ? PropTypes.any.isRequired
        : PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string])
              .isRequired,
    onClick: PropTypes.func,
    moreImages: PropTypes.number,
    className: PropTypes.string,
    classNameLandscape: PropTypes.string,
    classNamePortrait: PropTypes.string,
    style: PropTypes.object,
    stylePortrait: PropTypes.object,
    styleLandscape: PropTypes.object,
    preventParams: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            width: PropTypes.bool,
            height: PropTypes.bool,
            format: PropTypes.bool,
        }),
    ]),
};

Image.defaultProps = {
    moreImages: 0,
    onClick: null,
    className: '',
    classNameLandscape: '',
    classNamePortrait: '',
    style: {},
    stylePortrait: {},
    styleLandscape: {},
    preventParams: {},
};

Image.displayName = 'Image';
