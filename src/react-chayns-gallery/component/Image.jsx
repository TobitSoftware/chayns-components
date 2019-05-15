/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';
import SmallWaitCursor from '../../react-chayns-smallwaitcursor/component/SmallWaitCursor';
import { getImageMetaDataFromApi, getImageMetaDataFromPreview } from '../utils/getImageMetaData';
import { getDataUrlFromBase64, getDataUrlFromFile } from '../utils/getDataUrl';
import './Image.scss';

export default class Image extends PureComponent {
    static propTypes = {
        image: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]).isRequired,
        onClick: PropTypes.func,
        moreImages: PropTypes.number,
        tools: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
            onClick: PropTypes.func.isRequired,
        })),
        className: PropTypes.string,
        classNameLandscape: PropTypes.string,
        classNamePortrait: PropTypes.string,
        style: PropTypes.object,
        stylePortrait: PropTypes.object,
        styleLandscape: PropTypes.object,
    };

    static defaultProps = {
        moreImages: 0,
        onClick: null,
        tools: [],
        className: '',
        classNameLandscape: '',
        classNamePortrait: '',
        style: {},
        stylePortrait: {},
        styleLandscape: {},
    };

    static format = {
        LANDSCAPE: 1,
        PORTRAIT: 2,
    };

    static imageMetaData = {};

    constructor(props) {
        super(props);
        this.state = {
            ready: false, imageUrl: null, metaData: null, elementDimensions: null,
        };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.getElementDimensions();
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
                height: this.imageRef.current.clientHeight,
                width: this.imageRef.current.clientWidth,
            },
        });
    };

    init = async () => { // set url and metadata
        const { image, styleLandscape, stylePortrait } = this.props;

        if (typeof image === 'string') { // url
            if (Image.imageMetaData[image]) { // use cached metadata
                this.setState({ metaData: Image.imageMetaData[image], imageUrl: image });
            } else if (image.indexOf('tsimg.cloud') >= 0) { // get preview and dimensions from tsimg.cloud
                const metaData = await getImageMetaDataFromApi(image);
                Image.imageMetaData[image] = metaData;
                this.setState({ metaData, imageUrl: image });
            } else if (styleLandscape || stylePortrait) { // get dimensions if needed
                const metaData = await getImageMetaDataFromPreview(image);
                Image.imageMetaData[image] = metaData;
                this.setState({ metaData, imageUrl: image });
            } else { // set only the image url
                this.setState({ imageUrl: image });
            }
        } else { // file
            const imageUrl = await getDataUrlFromFile(image);
            if (styleLandscape || stylePortrait) { // get dimensions if needed
                const metaData = await getImageMetaDataFromPreview(imageUrl);
                this.setState({ metaData, imageUrl });
            } else { // set only the image url
                this.setState({ imageUrl });
            }
        }
    };

    onReady = () => {
        this.setState({ ready: true });
    };

    render() {
        const {
            moreImages,
            tools,
            onClick,
            className,
            classNameLandscape,
            classNamePortrait,
            style,
            styleLandscape,
            stylePortrait,
        } = this.props;

        const {
            metaData,
            imageUrl,
            ready,
            elementDimensions,
        } = this.state;

        let format = 0;
        if (metaData) {
            format = metaData.width > metaData.height ? Image.format.LANDSCAPE : Image.format.PORTRAIT;
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
                    ...(format === Image.format.LANDSCAPE ? styleLandscape : null),
                    ...(format === Image.format.PORTRAIT ? stylePortrait : null),
                }}
                data-more={(moreImages > 0) ? `+${moreImages}` : undefined}
            >
                {
                    imageUrl
                        ? (
                            <img
                                onClick={onClick}
                                key="image"
                                alt=""
                                src={chayns.utils.getScaledImageUrl(imageUrl, elementDimensions.height, elementDimensions.width)}
                                className={classNames('cc__image__img', { 'cc__image--clickable': onClick })}
                                onLoad={this.onReady}
                            />
                        )
                        : null
                }
                {
                    !ready && metaData && metaData.preview
                        ? [
                            <img
                                onClick={onClick}
                                key="preview"
                                alt=""
                                src={getDataUrlFromBase64(metaData.preview)}
                                className={classNames('cc__image__preview', { 'cc__image--clickable': onClick })}
                            />,
                            <div className="cc__image__wait-cursor" key="waitCursor">
                                <SmallWaitCursor show={!ready} showBackground={false} />
                            </div>,
                        ]
                        : null
                }
                {
                    tools
                        ? (
                            <div className="cc__image__tools">
                                {tools.map(tool => (
                                    <Icon onClick={tool.onClick} icon={tool.icon} className="image-tool" />
                                ))}
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}
