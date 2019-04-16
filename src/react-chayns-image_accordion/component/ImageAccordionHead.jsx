import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';

export default class ImageAccordionHead extends React.PureComponent {
    static propTypes = {
        item: PropTypes.instanceOf(Object),
        width: PropTypes.number,
        itemsPerRow: PropTypes.number,
        wrapperHeight: PropTypes.string,
    };

    static defaultProps = {
        item: null,
        width: 0,
        itemsPerRow: 0,
        wrapperHeight: 0,
    };

    render() {
        const {
            item,
            width,
            itemsPerRow,
            wrapperHeight,
        } = this.props;

        return (
            <div
                className={classNames('wrapper', { disabled: item.props.disabled })}
                style={{ height: wrapperHeight }}
            >
                <div
                    className={classNames('image', { 'no-image': !item.props.image })}
                    style={{
                        backgroundImage: item.props.image ? `url(${item.props.image})` : undefined,
                        borderRadius: item.props.circle ? '50%' : '0%',
                    }}
                />
                {item.props.headline && item.props.headline.length > 12
                    ? (
                        <Tooltip
                            bindListeners
                            position={2}
                            content={{ text: item.props.headline }}
                        >
                            <p
                                className="headline"
                            >
                                {`${item.props.headline.slice(0, 12)}...`}
                            </p>
                        </Tooltip>
                    )
                    : (
                        <p
                            className="headline"
                        >
                            {item.props.headline}
                        </p>
                    )
                }

                <h5
                    className="subheadline"
                >
                    {item.props.subheadline && item.props.subheadline.length > 13 ? `${item.props.subheadline.slice(0, 13)}...` : item.props.subheadline}
                </h5>
                {item.props.icon
                    && (
                        <div
                            className="icon"
                            style={{
                                top:
                                        item.props.iconPosition === 2 || item.props.iconPosition === 1
                                            ? '70px'
                                            : '0px',
                                left:
                                        item.props.iconPosition === 2 || item.props.iconPosition === 3
                                            ? '10px'
                                            : (width / itemsPerRow) - 15,
                            }}
                        >
                            {item.props.icon}
                        </div>
                    )
                }
            </div>
        );
    }
}
