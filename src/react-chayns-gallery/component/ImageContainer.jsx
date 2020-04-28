/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ImageContainer.scss';
import Icon from '../../react-chayns-icon/component/Icon';
import { isString } from '../../utils/is';

export default class ImageContainer extends PureComponent {
    render() {
        const {
            children, tools, className, style,
        } = this.props;

        return (
            <div className={classNames('cc__image-container', className)} style={style}>
                <div className="cc__image-container__content">
                    {children}
                </div>
                {
                    tools && tools.length > 0
                        ? (
                            <div className="cc__image-container__tools">
                                {tools.map((tool, index) => (
                                    <div
                                        key={`tool${index}`}
                                        onClick={tool.onClick}
                                        onMouseDown={tool.onDown}
                                        onTouchStart={tool.onDown}
                                        onMouseMove={tool.onMove}
                                        onTouchMove={tool.onMove}
                                        onMouseUp={tool.onUp}
                                        onTouchEnd={tool.onUp}
                                        onTouchCancel={tool.onUp}
                                        className={classNames('image-tool', tool.className, { [tool.icon]: isString(tool.icon) })}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {!isString(tool.icon) ? (
                                            <Icon
                                                icon={tool.icon}
                                            />
                                        ) : false}
                                    </div>
                                ))}
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}

ImageContainer.propTypes = {
    children: PropTypes.node.isRequired,
    tools: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
                iconName: PropTypes.string.isRequired,
                prefix: PropTypes.string.isRequired,
            }).isRequired,
        ]).isRequired,
        onClick: PropTypes.func,
        onDown: PropTypes.func,
        onMove: PropTypes.func,
        onUp: PropTypes.func,
        className: PropTypes.string,
    })),
    className: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

ImageContainer.defaultProps = {
    tools: [],
    className: null,
    style: null,
};

ImageContainer.displayName = 'ImageContainer';
