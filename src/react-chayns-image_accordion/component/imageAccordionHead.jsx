import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';

export default class ImageAccordionHead extends React.PureComponent {
    static propTypes = {
        item: PropTypes.instanceOf(Object).isRequired,
        width: PropTypes.instanceOf(Object).isRequired,
        percent: PropTypes.bool.isRequired,
        wrapperHeight: PropTypes.bool.isRequired,
    };

    render() {
        const {
            item,
            width,
            percent,
            wrapperHeight,
        } = this.props;
        return (
            <div
                className={classNames('wrapper', { itemDisabled: item.props.disabled })}
                style={{ height: wrapperHeight }}
            >
                <div
                    className={classNames('image', { noImage: !item.props.image })}
                    style={{
                        backgroundImage: item.props.image ? `url(${item.props.image})` : undefined,
                        borderRadius: item.props.circle ? '50%' : '0%',
                    }}
                />
                {item.props.headLine && item.props.headLine.length > 12
                    ? (
                        <Tooltip
                            bindListeners
                            position={2}
                            content={{ text: item.props.headLine }}
                        >
                            <p
                                className="head-line"
                            >
                                {`${item.props.headLine.slice(0, 12)}...`}
                            </p>
                        </Tooltip>
                    )
                    : (
                        <p
                            className="head-line"
                        >
                            {item.props.headLine}
                        </p>
                    )
                }

                <h5
                    className="sub-head-line"
                >
                    {item.props.subHeadLine && item.props.subHeadLine.length > 13 ? `${item.props.subHeadLine.slice(0, 13)}...` : item.props.subHeadLine}
                </h5>
                {item.props.itemIcon
                    && (
                        <div
                            className="item-icon"
                            style={{
                                top:
                                        item.props.iconPosition === 2 || item.props.iconPosition === 1
                                            ? '70px'
                                            : '0px',
                                left:
                                        item.props.iconPosition === 2 || item.props.iconPosition === 3
                                            ? '10px'
                                            : ((width * percent) / 100) - 20,
                            }}
                        >
                            {item.props.itemIcon}
                        </div>
                    )
                }
            </div>
        );
    }
}
