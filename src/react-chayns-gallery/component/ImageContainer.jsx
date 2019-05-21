import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ImageContainer.scss';
import Icon from '../../react-chayns-icon/component/Icon';

export default class ImageContainer extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        tools: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
            onClick: PropTypes.func.isRequired,
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
                                {tools.map(tool => (
                                    <div
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
