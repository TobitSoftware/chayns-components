/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ImageContainer.scss';

export default class ImageContainer extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        tools: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
            onClick: PropTypes.func,
            onDown: PropTypes.func,
            onMove: PropTypes.func,
            onUp: PropTypes.func,
        })),
        className: PropTypes.string,
    };

    static defaultProps = {
        tools: [],
        className: null,
    };

    render() {
        const { children, tools, className } = this.props;

        return (
            <div className={classNames('cc__image-container', className)}>
                <div className="cc__image-container__content">
                    {children}
                </div>
                {
                    tools
                        ? (
                            <div className="cc__image__tools">
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
                                        className={classNames('image-tool', tool.icon)}
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
