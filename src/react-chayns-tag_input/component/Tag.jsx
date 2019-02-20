import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import classnames from 'classnames';

import Icon from '../../react-chayns-icon/component/Icon';

export default class Tag extends PureComponent {
    static propTypes = {
        value: PropTypes.object.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        onDelete: PropTypes.func,
        selected: PropTypes.bool,
    };

    static defaultProps = {
        onDelete: null,
        selected: false,
    };

    handleDelete = () => {
        const { value, onDelete } = this.props;

        if (onDelete) {
            onDelete(value);
        }
    };

    render() {
        const { children, selected } = this.props;

        return (
            <div
                className={classnames('cc__tag', {
                    'cc__tag--selected': selected,
                })}
            >
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
