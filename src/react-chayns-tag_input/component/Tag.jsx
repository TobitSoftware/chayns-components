import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import Icon from '../../react-chayns-icon/component/Icon';

export default class Tag extends PureComponent {
    static propTypes = {
        value: PropTypes.object.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        onDelete: PropTypes.func,
    };

    static defaultProps = {
        onDelete: null,
    };

    handleDelete = () => {
        const { value, onDelete } = this.props;

        if (onDelete) {
            onDelete(value);
        }
    };

    render() {
        const { children } = this.props;

        return (
            <div className="cc__tag">
                {children}
                <Icon
                    className="icon"
                    icon={faTimes}
                    onClick={this.handleDelete}
                />
            </div>
        );
    }
}
