/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ImageContainer.scss';

export default class ImageContainer extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        tools: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            onClick: PropTypes.func,
            onDown: PropTypes.func,
            onMove: PropTypes.func,
            onUp: PropTypes.func,
            className: PropTypes.string,
        })),
        className: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        tools: [],
        className: null,
        style: null,
    };

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
                                        className={classNames('image-tool', tool.icon, tool.className)}
                                    />
                                ))}
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}
